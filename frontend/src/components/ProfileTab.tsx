import { motion } from "framer-motion";

const ProfileTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8"
    >
      <h3 className="font-display text-2xl font-bold gradient-text mb-6">Professional Summary</h3>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I am a passionate <span className="text-foreground font-medium">Electronics & Telecommunication Engineering</span> student
          with a strong foundation in embedded systems, IoT development, and full-stack web applications. I thrive at the intersection
          of hardware and software, building intelligent systems that solve real-world problems.
        </p>
        <p>
          With hands-on experience in <span className="text-foreground font-medium">ESP32, Arduino, and sensor integration</span>,
          I have developed IoT solutions including cattle health monitoring systems and rocket avionics platforms. My technical repertoire
          extends to full-stack development with modern frameworks, AI-enabled applications, and security-focused system design.
        </p>
        <p>
          I am driven by curiosity and a commitment to innovation — constantly exploring new technologies, contributing to open-source
          projects, and pushing the boundaries of what embedded and web technologies can achieve together.
        </p>
      </div>
    </motion.div>
  );
};

export default ProfileTab;
