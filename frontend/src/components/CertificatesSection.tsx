import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

type Certificate = {
  id?: string;
  title: string;
  issuer: string;
  status: string;
};

const fallbackCertificates: Certificate[] = [
  {
    title: "Full Stack Development Training",
    issuer: "Sahyadri Software",
    status: "Completed",
  },
  {
    title: "Java Bootcamp",
    issuer: "LetsUpgrade",
    status: "Certified",
  },
  {
    title: "Python Bootcamp",
    issuer: "LetsUpgrade",
    status: "Certified",
  },
  {
    title: "Embedded and IOT",
    issuer: "NPTEL",
    status: "IIT Certified",
  },
  {
    title: "Full-Stack Development",
    issuer: "Apna College",
    status: "Completed",
  },
];

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(fallbackCertificates);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await apiGet<Array<{ id: string; title: string; issuer: string; status: string }>>(
          "/certificates",
        );
        setCertificates(data);
      } catch {
        setCertificates(fallbackCertificates);
      }
    };

    void loadCertificates();
  }, []);

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Certificates <span className="gradient-text">Showcase</span>
          </h2>
          <div className="w-20 h-1 rounded-full bg-primary mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((item, index) => (
            <motion.article
              key={item.id ?? `${item.title}-${item.issuer}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.issuer}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-secondary/60 px-3 py-1 text-xs text-foreground">
                  <BadgeCheck size={13} className="text-primary" />
                  {item.status}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;

