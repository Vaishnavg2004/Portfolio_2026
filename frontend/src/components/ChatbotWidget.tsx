import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const predefinedResponses: Record<string, string> = {
  skills: "Vaishnav is skilled in Embedded Systems (ESP32, Arduino), IoT, Full-Stack Web Development (HTML, CSS, JS, PHP), Python, C/C++, and tools like Git, Docker, and Postman.",
  projects: "Key projects include: 1) IoT-Based Cattle Health Monitoring System, 2) Rocket Parachute Deployment & Avionics System, and 3) VIRTI AI – an intelligent virtual assistant platform.",
  education: "Vaishnav is pursuing B.E. in Electronics and Telecommunication (ENTC) from SVPM College of Engineering, Baramati (SPPU) with a CGPA of 8.02. HSC: 89%, SSC: 90%.",
  contact: "You can reach Vaishnav at vaishnavg2004@gmail.com or call +91 9764201117. Connect on LinkedIn and GitHub too!",
  hello: "Hello! I'm Vaishnav's AI Assistant. Ask me about his skills, projects, education, or contact info!",
  hi: "Hi there! 👋 I'm here to help you learn about Vaishnav. Try asking about his skills, projects, or education!",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(predefinedResponses)) {
    if (lower.includes(key)) return predefinedResponses[key];
  }
  return "I can help you learn about Vaishnav's skills, projects, education, and contact information. Try asking about any of these topics!";
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! 👋 I'm Vaishnav's AI Assistant. Ask me about his skills, projects, or education!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card w-80 sm:w-96 mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-border flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-foreground text-sm">Vaishnav AI Assistant</h4>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-glass-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-secondary border border-glass-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button onClick={handleSend} className="gradient-btn !px-3 !py-2">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="gradient-btn !rounded-full !p-4 shadow-lg"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
