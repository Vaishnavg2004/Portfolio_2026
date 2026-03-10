const certificates = [
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

export default function handler(_req: unknown, res: { status: (code: number) => { json: (body: object) => void } }) {
  res.status(200).json({ data: certificates });
}
