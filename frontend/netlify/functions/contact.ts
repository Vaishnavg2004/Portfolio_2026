import { createClient } from "@supabase/supabase-js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function response(statusCode: number, body: object) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

async function sendEmailNotification(payload: { name: string; email: string; message: string }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !to || !from) {
    return;
  }

  const subject = `Portfolio Contact: ${payload.name}`;
  const html = `
    <h2>New portfolio message</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br/>")}</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      html,
    }),
  });
}

export const handler = async (event: { httpMethod?: string; body?: string | null; headers?: Record<string, string> }) => {
  if (event.httpMethod !== "POST") {
    return response(405, { error: "Method not allowed" });
  }

  let parsed: { name?: string; email?: string; message?: string };
  try {
    parsed = JSON.parse(event.body || "{}");
  } catch {
    return response(400, { error: "Invalid JSON payload" });
  }

  const name = (parsed.name || "").trim();
  const email = (parsed.email || "").trim();
  const message = (parsed.message || "").trim();

  if (name.length < 2 || name.length > 100) {
    return response(400, { error: "Name must be 2 to 100 characters" });
  }

  if (!emailRegex.test(email) || email.length > 200) {
    return response(400, { error: "Email is invalid" });
  }

  if (message.length < 10 || message.length > 3000) {
    return response(400, { error: "Message must be 10 to 3000 characters" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return response(500, { error: "Supabase credentials are not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email,
        message,
        source: "portfolio-netlify",
        user_agent: event.headers?.["user-agent"] || null,
      },
    ])
    .select("id,created_at")
    .single();

  if (error) {
    return response(500, {
      error: "Failed to save contact message",
      details: error.message,
    });
  }

  await sendEmailNotification({ name, email, message });

  return response(201, {
    message: "Contact request received",
    data,
  });
};
