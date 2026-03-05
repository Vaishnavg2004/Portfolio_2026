import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "B.E. Electronics and Telecommunication (ENTC)",
    institution: "SVPM College of Engineering, Baramati (SPPU)",
    period: "2022 – 2026",
    score: "CGPA: 8.02",
  },
  {
    degree: "HSC (12th Standard)",
    institution: "Maharashtra State Board",
    period: "2022",
    score: "89%",
  },
  {
    degree: "SSC (10th Standard)",
    institution: "Maharashtra State Board",
    period: "2020",
    score: "90%",
  },
];

const EducationTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {educationData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          className="glass-card p-6 flex gap-5 items-start"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="text-primary" size={22} />
          </div>
          <div className="flex-1">
            <h4 className="font-display text-lg font-bold text-foreground">{item.degree}</h4>
            <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <span className="skill-pill">{item.period}</span>
              <span className="skill-pill border-primary/40 text-primary">{item.score}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EducationTab;
