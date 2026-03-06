import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingSidebar from "@/components/FloatingSidebar";
import HeroSection from "@/components/HeroSection";
import TabNavigation from "@/components/TabNavigation";
import ProfileTab from "@/components/ProfileTab";
import EducationTab from "@/components/EducationTab";
import ExperienceTab from "@/components/ExperienceTab";
import SkillsTab from "@/components/SkillsTab";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const node = pageRef.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      node.style.setProperty("--cursor-x", `${event.clientX}px`);
      node.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const startFadeTimer = window.setTimeout(() => setIntroFadeOut(true), 2200);
    const removeIntroTimer = window.setTimeout(() => setShowIntro(false), 3000);

    return () => {
      window.clearTimeout(startFadeTimer);
      window.clearTimeout(removeIntroTimer);
    };
  }, []);

  const handleNavigate = (section: string) => {
    const resolvedSection = section === "creative" ? "certificates" : section;
    const tabSections = new Set(["profile", "education", "experience", "skills"]);

    if (tabSections.has(resolvedSection)) {
      setActiveTab(resolvedSection);
      setActiveSection(resolvedSection);
      document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setActiveSection(resolvedSection);
    document.getElementById(resolvedSection)?.scrollIntoView({ behavior: "smooth" });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "education":
        return <EducationTab />;
      case "experience":
        return <ExperienceTab />;
      case "skills":
        return <SkillsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background relative overflow-x-hidden page-cursor-glow">
      {showIntro && (
        <div className={`intro-screen ${introFadeOut ? "fade-out" : ""}`}>
          <div className="intro-orb intro-orb-left" />
          <div className="intro-orb intro-orb-right" />
          <p className="intro-kicker">Welcome to</p>
          <h1 className="intro-title">
            <span className="intro-word intro-word-1">Vaishnav&apos;s</span>
            <span className="intro-word intro-word-2">World</span>
          </h1>
        </div>
      )}
      <div aria-hidden className="cursor-aura" />
      <div className="relative z-10">
        <FloatingSidebar activeSection={activeSection} onNavigate={handleNavigate} />

        <div className="lg:pl-20">
          <HeroSection />

          {/* Tab Section */}
          <section id="profile" className="py-16">
            <div className="container mx-auto px-6 lg:px-16">
              <TabNavigation
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setActiveSection(tab);
                }}
              />
              <AnimatePresence mode="wait">
                <div key={activeTab}>{renderTab()}</div>
              </AnimatePresence>
            </div>
          </section>

          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </div>

        <ChatbotWidget />
      </div>
    </div>
  );
};

export default Index;
