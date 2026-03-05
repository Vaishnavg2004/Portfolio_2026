import { useState } from "react";
import { motion } from "framer-motion";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "profile", label: "Profile Summary" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Technical Skills" },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground bg-secondary/50 border border-glass-border"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(258 70% 58%), hsl(220 80% 55%))",
                boxShadow: "0 4px 20px hsl(258 70% 58% / 0.3)",
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
