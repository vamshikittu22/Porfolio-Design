
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Expanded vocabulary covering roles, tech, resume, career, education, and projects
const VOCABULARY = [
  "Software Engineer", "Fullstack", "AI Native", "React 19", "C#", ".NET Core", 
  "TypeScript", "MS CIS", "UCM", "Charlotte", "Vamshi", "Krishna", "Pullaiahgari", 
  "Mini Metro", "Future Job Fit", "Wanderlust Trails", "Event Node Pro", "MySQL", 
  "Azure", "Gemini 3 Pro", "Vite", "REST API", "CRM", "SDLC", "Agile", "Scrum", 
  "B.Tech CSE", "MIST", "Pune", "India", "USA", "STEM OPT", "Frontend", "Backend", 
  "Architecture", "Scalability", "Swiss Design", "Minimalism", "Logic", "Algorithm", 
  "Data Structures", "Prompt Engineering", "LLM", "Generative AI", "HTML5", "CSS3", 
  "Node.js", "PHP", "Mphasis", "AI Labs", "DevOps", "ITSM", "ServiceNow", "SQL", 
  "PostgreSQL", "JavaScript", "Clean Code", "Unit Testing", "UAT", "Deployment", 
  "Kinetic", "Typography", "Cyber", "Futurism", "Engineering", "Precision", "Modular",
  "Missouri", "Warrensburg", "Hyderabad", "Automation", "MVC", "Entity Framework",
  "API Integration", "UI/UX", "Cloud Architecture", "Interactive", "Performance",
  "Systems", "Development", "Professional", "Portfolio", "Innovation", "Code",
  "Git", "GitHub", "Vercel", "Tailwind", "Framer Motion", "Synthesis", "Logic",
  "Event Management", "Movie Booking", "Twitter Integrity", "Java", "Core Java",
  "Object Oriented", "Distributed Data", "Enterprise Resource", "Optimization"
];

const COLORS = [
  "var(--color-fg)",
  "var(--color-accent)",
  "var(--color-accent-secondary)",
  "var(--color-fg-muted)",
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f43f5e", // Rose
  "#f59e0b", // Amber
  "#8b5cf6", // Purple
  "#06b6d4"  // Cyan
];

const FONTS = ["font-display", "font-sans", "font-mono"];
const WEIGHTS = ["font-black", "font-bold", "font-medium", "font-light", "font-extrabold"];

interface WordItem {
  text: string;
  top: string;
  left: string;
  rotate: number;
  size: string;
  color: string;
  weight: string;
  font: string;
  opacity: number;
  tracking: string;
  italic: boolean;
}

export const NameBackground: React.FC = () => {
  const items = useMemo(() => {
    const tempItems: WordItem[] = [];
    const count = 120; // High density saturation

    const trackingOptions = ["tracking-tighter", "tracking-tight", "tracking-normal", "tracking-widest"];

    for (let i = 0; i < count; i++) {
      const text = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];
      const sizeValue = Math.random() * 5 + 0.6; // Wider range for Swiss hierarchy (0.6rem to 5.6rem)
      
      // Swiss design often uses 90-degree rotations for layout balance
      const rotationPresets = [0, 90, 0, 0, -90, 5, -5];
      const rotate = rotationPresets[Math.floor(Math.random() * rotationPresets.length)];

      tempItems.push({
        text,
        top: `${Math.random() * 110 - 5}%`,
        left: `${Math.random() * 110 - 5}%`,
        rotate: rotate,
        size: `${sizeValue}rem`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        weight: WEIGHTS[Math.floor(Math.random() * WEIGHTS.length)],
        font: FONTS[Math.floor(Math.random() * FONTS.length)],
        opacity: Math.random() * 0.12 + 0.015, // Subtle but present
        tracking: trackingOptions[Math.floor(Math.random() * trackingOptions.length)],
        italic: Math.random() > 0.85
      });
    }
    return tempItems;
  }, []);

  return (
    <div className="absolute inset-[-15%] z-0 pointer-events-none overflow-hidden select-none opacity-50">
      {items.map((item, i) => (
        <motion.span
          key={`${item.text}-${i}`}
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: item.opacity, filter: 'blur(3px)' }}
          whileHover={{ 
            opacity: 0.5, 
            filter: 'blur(0px)',
            scale: 1.15,
            zIndex: 100,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className={`absolute uppercase cursor-default pointer-events-auto whitespace-nowrap will-change-transform ${item.font} ${item.weight} ${item.tracking} ${item.italic ? 'italic' : ''}`}
          style={{ 
            top: item.top, 
            left: item.left, 
            fontSize: item.size,
            color: item.color,
            rotate: `${item.rotate}deg`,
            transformOrigin: 'center'
          }}
        >
          {item.text}
        </motion.span>
      ))}
      
      {/* Dynamic Overlay Grain for additional Swiss texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
