import { createClient } from "@supabase/supabase-js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Req = {
  method?: string;
  body?: {
    name?: string;
    email?: string;
    message?: string;
  };
  headers?: Record<string, string | string[] | undefined>;
};

type Res = {
  status: (code: number) => Res;
  json: (body: object) => void;
};

async function sendEmailNotification(payload: { name: string; email: string; message: string }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !to || !from) {
    return;
  }

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
      subject: `Portfolio Contact: ${payload.name}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message.replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = (req.body?.name || "").trim();
  const email = (req.body?.email || "").trim();
  const message = (req.body?.message || "").trim();

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: "Name must be 2 to 100 characters" });
  }

  if (!emailRegex.test(email) || email.length > 200) {
    return res.status(400).json({ error: "Email is invalid" });
  }

  if (message.length < 10 || message.length > 3000) {
    return res.status(400).json({ error: "Message must be 10 to 3000 characters" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({ error: "Supabase credentials are not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const userAgentHeader = req.headers?.["user-agent"];
  const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : (userAgentHeader ?? null);

  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email,
        message,
        source: "portfolio-vercel",
        user_agent: userAgent,
      },
    ])
    .select("id,created_at")
    .single();

  if (error) {
    return res.status(500).json({
      error: "Failed to save contact message",
      details: error.message,
    });
  }

  await sendEmailNotification({ name, email, message });

  return res.status(201).json({
    message: "Contact request received",
    data,
  });
}
