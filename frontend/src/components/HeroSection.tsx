import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import profilePhoto from "@/assets/Vaishnav_Image.png";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p
              className="text-primary font-medium text-lg mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="gradient-text">Vaishnav Rahul</span>
              <br />
              <span className="text-foreground">Gaikwad</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 font-display">
              Electronics & Telecommunication Engineer
            </p>
            <p className="text-muted-foreground mb-8">
              Embedded Systems | IoT | Full-Stack Developer
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="gradient-btn flex items-center gap-2">
                <Download size={18} />
                Get My CV
              </button>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-glass-border text-foreground font-semibold hover:bg-secondary transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Right - Photo */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="hero-photo-shell animate-pulse-glow">
              <div className="hero-photo-blob">
                <img
                  src={profilePhoto}
                  alt="Vaishnav Rahul Gaikwad"
                  className="w-full h-full object-cover hero-photo-image"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
