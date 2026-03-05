import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

type Project = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  color: string;
};

const fallbackProjects: Project[] = [
  {
    title: "IoT-Based Cattle Health Monitoring System",
    description:
      "A comprehensive IoT solution using ESP32 and various sensors to monitor cattle vital signs in real-time. Features automated alerts, data logging to Firebase, and a responsive web dashboard for farmers.",
    tags: ["ESP32", "IoT", "Firebase", "Sensors", "Web Dashboard"],
    github: "https://github.com/users/Vaishnavg2004/projects/3",
    color: "from-primary/20 to-blue-500/10",
  },
  {
    title: "Rocket Parachute Deployment & Avionics System",
    description:
      "An embedded avionics system for model rockets featuring altitude-triggered parachute deployment, real-time telemetry, and flight data recording using barometric pressure sensors and accelerometers.",
    tags: ["Arduino", "Embedded C", "Avionics", "Telemetry", "Sensors"],
    github: "https://github.com/users/Vaishnavg2004/projects/4",
    color: "from-purple-500/20 to-primary/10",
  },
  {
    title: "VIRTI AI - Intelligent Virtual Assistant Platform",
    description:
      "A full-stack AI-enabled virtual assistant platform with natural language processing, context-aware responses, and multi-domain knowledge support. Built with modern web technologies and secure authentication.",
    tags: ["Python", "AI/ML", "Full-Stack", "NLP", "Security"],
    github: "https://github.com/users/Vaishnavg2004/projects/5",
    color: "from-blue-500/20 to-cyan-500/10",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiGet<Array<{ id: string; name: string; description: string; githubUrl: string }>>(
          "/projects",
        );

        const colorPalette = [
          "from-primary/20 to-blue-500/10",
          "from-purple-500/20 to-primary/10",
          "from-blue-500/20 to-cyan-500/10",
        ];

        const mapped: Project[] = data.map((item, index) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          tags: fallbackProjects[index]?.tags ?? ["Project"],
          github: item.githubUrl,
          color: colorPalette[index % colorPalette.length],
        }));

        setProjects(mapped);
      } catch {
        setProjects(fallbackProjects);
      }
    };

    void loadProjects();
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Project <span className="gradient-text">Portfolio</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-primary mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-card overflow-hidden group"
            >
              <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ExternalLink className="text-primary" size={28} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

