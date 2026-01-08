
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const VOCABULARY = [
  "Vamshi Krishna", "Pullaiahgari", "Software Engineer", "AI Native", "Senior Developer",
  "React 19", "C#", ".NET Core", "TypeScript", "MS CIS", "UCM", "MIST", "B.Tech CSE",
  "Charlotte", "Missouri", "Warrensburg","Utah", "Hyderabad", "Pune", "India", "USA", "STEM OPT",
  "Mini Metro", "Future Job Fit", "Wanderlust Trails", "Event Node Pro", "Cinematic Discovery",
  "MySQL", "Azure", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "GraphQL",
  "Vite", "REST API", "CRM", "SDLC", "Agile", "Scrum", "Sprint", "UAT", "Deployment",
  "Mphasis", "Zions Bank", "AI Labs Web LLC", "DevOps", "ITSM", "ServiceNow", "Control-M", "Solarwinds",
  "Clean Code", "Unit Testing", "Architecture", "Scalability", "Performance", "Optimization",
  "Swiss Design", "Minimalism", "Bauhaus", "Modernism", "Grid System", "Typography",
  "Logic", "Algorithm", "Data Structures", "Big O", "Complexity", "Recursion",
  "Prompt Engineering", "LLM", "Generative AI", "Gemini 3 Pro", "Nano Banana", "VEO",
  "HTML5", "CSS3", "JavaScript", "Node.js", "PHP", "Laravel", "MVC", "Entity Framework",
  "Kinetic", "Interactive", "Cyber", "Futurism", "Modular", "Precision", "Synthesis",
  "Event Management", "Movie Booking", "Twitter Integrity", "Information Systems",
  "Object Oriented", "Distributed Data", "Cloud Architecture", "UI/UX", "Product Design",
  "Bungee Jump", "Rishikesh", "Adventure", "Traveler", "Road Trip", "Elephant Camp",
  "Ganga Aarti", "Coorg", "Dubare", "Coffee Estates", "Tibetan Temples", "Innovator",
  "Problem Solver", "Self-learning", "Adaptability", "Time Management", "Leadership",
  "Fullstack", "Frontend", "Backend", "Middle Tier", "API Integration", "Secure Logic",
  "Accessibility", "A11y", "Responsive", "Mobile First", "Enterprise Ready", "Scale"
];

const COLORS = [
  "var(--color-accent)",
  "var(--color-accent-secondary)",
  "var(--ink-1)",
  "var(--ink-2)",
  "var(--ink-3)",
  "var(--ink-4)",
];

const FONTS = ["font-display", "font-sans", "font-mono"];
const WEIGHTS = ["font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black"];

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
  isOutline: boolean;
  tracking: string;
  italic: boolean;
  idleBlur: string;
}

export const NameBackground: React.FC = () => {
  const items = useMemo(() => {
    const tempItems: WordItem[] = [];
    const count = 550; // Rendering 550 instances of technical keywords

    for (let i = 0; i < count; i++) {
      const text = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];
      const roll = Math.random();
      let sizeValue: number;
      let opacityBase: number;
      let blurValue: string;

      // Tiered density for architectural depth
      if (roll < 0.05) {
        sizeValue = Math.random() * 6 + 5; // Macro Layer
        opacityBase = 0.08; 
        blurValue = "blur(3px)";
      } else if (roll < 0.2) {
        sizeValue = Math.random() * 2 + 1.2; // Secondary Detail
        opacityBase = 0.18;
        blurValue = "blur(0px)";
      } else if (roll < 0.6) {
        sizeValue = Math.random() * 0.7 + 0.6; // Core Grid
        opacityBase = 0.28;
        blurValue = "blur(0px)";
      } else {
        sizeValue = Math.random() * 0.4 + 0.3; // Texture Layer
        opacityBase = 0.35;
        blurValue = "blur(0px)";
      }
      
      const rotations = [0, 0, 0, 90, -90, 0]; // Restricted to structural angles
      const rotate = rotations[Math.floor(Math.random() * rotations.length)];
      const trackingOptions = ["tracking-tighter", "tracking-tight", "tracking-normal", "tracking-widest"];

      tempItems.push({
        text,
        top: `${Math.random() * 120 - 10}%`,
        left: `${Math.random() * 120 - 10}%`,
        rotate: rotate,
        size: `${sizeValue}rem`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        weight: WEIGHTS[Math.floor(Math.random() * WEIGHTS.length)],
        font: FONTS[Math.floor(Math.random() * FONTS.length)],
        opacity: opacityBase,
        isOutline: Math.random() > 0.85, 
        tracking: trackingOptions[Math.floor(Math.random() * trackingOptions.length)],
        italic: Math.random() > 0.95,
        idleBlur: blurValue
      });
    }
    return tempItems;
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <div className="w-full h-full relative opacity-100">
        {items.map((item, i) => (
          <motion.span
            key={`${item.text}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: item.opacity, 
              filter: item.idleBlur 
            }}
            whileHover={{ 
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1.15,
              zIndex: 100,
              transition: { duration: 0.15 }
            }}
            className={`absolute uppercase whitespace-nowrap cursor-default pointer-events-auto transition-all duration-500 will-change-[opacity,transform,filter] ${item.font} ${item.weight} ${item.tracking} ${item.italic ? 'italic' : ''}`}
            style={{ 
              top: item.top, 
              left: item.left, 
              fontSize: item.size,
              color: item.isOutline ? 'transparent' : item.color,
              WebkitTextStroke: item.isOutline ? `1px ${item.color}` : 'none',
              rotate: `${item.rotate}deg`,
              transformOrigin: 'center'
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </div>
      
      {/* Editorial Shadow Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-t-bg via-transparent to-t-bg opacity-80 dark:opacity-70 pointer-events-none z-10 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-t-bg via-transparent to-t-bg opacity-80 dark:opacity-70 pointer-events-none z-10 transition-colors duration-500" />
    </div>
  );
};
