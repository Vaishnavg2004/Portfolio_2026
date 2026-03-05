import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";
import { apiPost } from "@/lib/api";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 9764201117", href: "tel:+919764201117" },
  { icon: Mail, label: "Email", value: "vaishnavg2004@gmail.com", href: "mailto:vaishnavg2004@gmail.com" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/vaishnav-gaikwad-534171291",
    href: "https://linkedin.com/in/vaishnav-gaikwad-534171291",
  },
  { icon: Github, label: "GitHub", value: "github.com/Vaishnavg2004", href: "https://github.com/Vaishnavg2004" },
];

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiPost<ContactForm, { message: string }>("/contact", formData);
      alert("Message sent! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      alert("Unable to send message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-primary mt-3" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-5 flex items-center gap-4 hover:border-primary/40 transition-all duration-300 block"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-medium text-sm">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-secondary border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Your Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-secondary border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-secondary border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-none"
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="gradient-btn flex items-center gap-2 w-full justify-center disabled:opacity-70"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

