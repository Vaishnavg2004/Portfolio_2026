import { motion } from "framer-motion";
import { Code, Cpu, Database, Wrench, Layers, Paintbrush } from "lucide-react";

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
            {category.skills.map((skill) => (
              <span key={skill} className="skill-pill text-xs">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsTab;
