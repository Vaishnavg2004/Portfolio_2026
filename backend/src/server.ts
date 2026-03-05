import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8080";
const allowedOrigins = new Set([
  FRONTEND_ORIGIN,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());
app.use(morgan("dev"));

type Project = {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  status: string;
};

const projects: Project[] = [
  {
    id: "iot-cattle-monitoring",
    name: "IoT-Based Cattle Health Monitoring System",
    description:
      "Real-time cattle vital monitoring with ESP32, sensors, and dashboard alerts.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/3",
  },
  {
    id: "rocket-parachute",
    name: "Rocket Parachute Deployment & Avionics System",
    description:
      "Embedded avionics with altitude-triggered parachute and telemetry logging.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/4",
  },
  {
    id: "virti-ai",
    name: "VIRTI AI - Intelligent Virtual Assistant Platform",
    description:
      "AI-enabled assistant platform with secure full-stack architecture.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/5",
  },
];

const certificates: Certificate[] = [
  {
    id: "sahyadri-full-stack",
    title: "Full Stack Development Training",
    issuer: "Sahyadri Software",
    status: "Completed",
  },
  {
    id: "letsupgrade-java",
    title: "Java Bootcamp",
    issuer: "LetsUpgrade",
    status: "Certified",
  },
  {
    id: "letsupgrade-python",
    title: "Python Bootcamp",
    issuer: "LetsUpgrade",
    status: "Certified",
  },
  {
    id: "nptel-embedded-iot",
    title: "Embedded and IOT",
    issuer: "NPTEL",
    status: "IIT Certified",
  },
  {
    id: "apna-full-stack",
    title: "Full-Stack Development",
    issuer: "Apna College",
    status: "Completed",
  },
];

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(3000),
});

type ContactMessage = z.infer<typeof contactSchema> & {
  id: string;
  createdAt: string;
};

const contactMessages: ContactMessage[] = [];

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "portfolio-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/projects", (_req, res) => {
  res.json({ data: projects });
});

app.get("/api/certificates", (_req, res) => {
  res.json({ data: certificates });
});

app.post("/api/contact", (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid contact payload",
      issues: parsed.error.issues,
    });
  }

  const payload = parsed.data;
  const message: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload,
  };

  contactMessages.push(message);

  return res.status(201).json({
    message: "Contact request received",
    data: {
      id: message.id,
      createdAt: message.createdAt,
    },
  });
});

app.get("/api/contact", (_req, res) => {
  res.json({ data: contactMessages });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
