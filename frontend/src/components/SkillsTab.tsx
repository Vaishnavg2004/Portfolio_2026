import { motion } from "framer-motion";
import { Code, Cpu, Database, Wrench, Layers, Paintbrush } from "lucide-react";

const skillLogos: Record<string, string> = {
  C: "https://cdn.simpleicons.org/c/A8B9CC",
  "C++": "https://cdn.simpleicons.org/cplusplus/00599C",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  "Java (Basics)": "https://cdn.simpleicons.org/openjdk/ED8B00",
  PHP: "https://cdn.simpleicons.org/php/777BB4",
  HTML5: "https://cdn.simpleicons.org/html5/E34F26",
  CSS3: "https://cdn.simpleicons.org/css/1572B6",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  ESP32: "https://cdn.simpleicons.org/espressif/E7352C",
  Arduino: "https://cdn.simpleicons.org/arduino/00979D",
  MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
  MongoDB: "https://cdn.simpleicons.org/mongodb/47A248",
  Firebase: "https://cdn.simpleicons.org/firebase/DD2C00",
  Git: "https://cdn.simpleicons.org/git/F05032",
  GitHub: "https://cdn.simpleicons.org/github/181717",
  Docker: "https://cdn.simpleicons.org/docker/2496ED",
  Postman: "https://cdn.simpleicons.org/postman/FF6C37",
  "VS Code": "https://api.iconify.design/logos:visual-studio-code.svg",
  "After Effects": "https://api.iconify.design/logos:adobe-after-effects.svg",
  Figma: "https://cdn.simpleicons.org/figma/F24E1E",
  Blender: "https://cdn.simpleicons.org/blender/F5792A",
  CapCut: "https://api.iconify.design/mdi:movie-edit.svg?color=111111",
};

const skillCategories = [
  {
    title: "Development",
    icon: Code,
    skills: ["C", "C++", "Python", "Java (Basics)", "PHP"],
  },
  {
    title: "Web Technologies",
    icon: Layers,
    skills: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Embedded & IoT",
    icon: Cpu,
    skills: ["ESP32", "Arduino", "GPIO", "UART", "I2C", "Sensors"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
  },
  {
    title: "Core Concepts",
    icon: Layers,
    skills: ["DSA", "OOP", "DBMS", "OS (Basics)"],
  },
  {
    title: "Creative",
    icon: Paintbrush,
    skills: ["After Effects", "Figma", "Blender", "CapCut"],
  },
];

const SkillsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {skillCategories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <category.icon className="text-primary" size={18} />
            </div>
            <h4 className="font-display font-semibold text-foreground">{category.title}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => {
              const logo = skillLogos[skill];
              const fallback = skill
                .replace(/\(.*?\)/g, "")
                .split(/[\s-]+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase();

              return (
                <span key={skill} className="skill-pill text-xs flex items-center gap-1.5">
                  {logo ? (
                    <img src={logo} alt={`${skill} logo`} className="skill-pill-logo" loading="lazy" />
                  ) : (
                    <span className="skill-pill-fallback">{fallback}</span>
                  )}
                  <span>{skill}</span>
                </span>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsTab;
