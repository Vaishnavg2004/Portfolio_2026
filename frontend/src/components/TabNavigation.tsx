import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PersonStanding } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [guideX, setGuideX] = useState(0);
  const [hopKey, setHopKey] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const updateGuidePosition = () => {
      const container = containerRef.current;
      const activeButton = buttonRefs.current[activeTab];
      if (!container || !activeButton) return;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const centerX = buttonRect.left - containerRect.left + buttonRect.width / 2;
      setGuideX(centerX);
    };

    updateGuidePosition();
    window.addEventListener("resize", updateGuidePosition);
    return () => window.removeEventListener("resize", updateGuidePosition);
  }, [activeTab]);

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const prevIndex = prevIndexRef.current;
    setDirection(currentIndex >= prevIndex ? 1 : -1);
    setHopKey((prev) => prev + 1);
    prevIndexRef.current = currentIndex;
  }, [activeTab]);

  return (
    <div ref={containerRef} className="relative flex flex-wrap gap-2 mb-8 pt-9">
      <motion.div
        className="absolute top-0 z-20 w-8 h-8 rounded-full bg-primary/20 border border-primary/35 flex items-center justify-center shadow-[0_6px_14px_hsl(258_70%_58%_/_0.25)]"
        animate={{ x: guideX - 16 }}
        transition={{
          x: { type: "spring", stiffness: 280, damping: 23, mass: 0.8 },
        }}
      >
        <motion.div
          key={hopKey}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -14, -6, -2, 0],
            rotate: [0, direction * 14, direction * -6, 0],
          }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        >
          <PersonStanding size={16} className="text-primary-foreground" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-7 h-[2px] rounded-full bg-gradient-to-r from-primary/0 via-primary/55 to-primary/0 pointer-events-none"
        animate={{ left: 0, width: guideX }}
        transition={{ type: "spring", stiffness: 240, damping: 25 }}
      />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(node) => {
            buttonRefs.current[tab.id] = node;
          }}
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
