const projects = [
  {
    id: "iot-cattle-monitoring",
    name: "IoT-Based Cattle Health Monitoring System",
    description: "Real-time cattle vital monitoring with ESP32, sensors, and dashboard alerts.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/3",
  },
  {
    id: "rocket-parachute",
    name: "Rocket Parachute Deployment & Avionics System",
    description: "Embedded avionics with altitude-triggered parachute and telemetry logging.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/4",
  },
  {
    id: "virti-ai",
    name: "VIRTI AI - Intelligent Virtual Assistant Platform",
    description: "AI-enabled assistant platform with secure full-stack architecture.",
    githubUrl: "https://github.com/users/Vaishnavg2004/projects/5",
  },
];

export default function handler(_req: unknown, res: { status: (code: number) => { json: (body: object) => void } }) {
  res.status(200).json({ data: projects });
}
