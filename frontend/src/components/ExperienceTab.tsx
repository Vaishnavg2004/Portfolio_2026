import { motion } from "framer-motion";

const ExperienceTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8"
    >
      <h3 className="font-display text-2xl font-bold gradient-text mb-6">Experience & Activities</h3>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          As an active engineering student, I have participated in multiple hackathons, technical workshops,
          and innovation challenges. My practical experience spans across building IoT prototypes,
          developing full-stack web applications, and designing embedded systems for real-world deployment.
        </p>
        <p>
          I have collaborated on interdisciplinary projects combining hardware design with software engineering,
          gaining valuable experience in project management, team coordination, and agile development practices.
        </p>
      </div>
    </motion.div>
  );
};

export default ExperienceTab;
