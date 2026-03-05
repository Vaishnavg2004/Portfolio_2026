export const handler = async () => {
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

  return {
    statusCode: 200,
    body: JSON.stringify({ data: certificates }),
  };
};
