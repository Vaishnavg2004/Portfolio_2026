import { Home, User, Code, Award, ScrollText, Mail, Github, Linkedin, Twitter, GraduationCap, Briefcase } from "lucide-react";

interface FloatingSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const topIcons = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: Code, label: "Projects" },
  { id: "certificates", icon: ScrollText, label: "Certificates" },
  { id: "skills", icon: Award, label: "Skills" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const socialIcons = [
  { href: "https://github.com/Vaishnavg2004", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/vaishnav-gaikwad-534171291", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/vaishnavg", icon: Twitter, label: "Twitter" },
];

const FloatingSidebar = ({ activeSection, onNavigate }: FloatingSidebarProps) => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex">
      <div className="floating-sidebar">
        {topIcons.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`sidebar-icon-btn ${activeSection === item.id ? "active" : ""}`}
            title={item.label}
          >
            <item.icon size={18} />
          </button>
        ))}

        <div className="w-6 h-px bg-border my-2" />

        {socialIcons.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-icon-btn"
            title={item.label}
          >
            <item.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingSidebar;
