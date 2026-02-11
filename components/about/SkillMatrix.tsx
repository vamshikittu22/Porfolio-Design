import React, { useMemo } from 'react';
import { SKILLS_RESUME } from '../../config/constants';
import { SkillBubble } from './SkillBubble';

interface SkillMatrixProps {
    hoveredSkill: string | null;
    setHoveredSkill: (name: string | null) => void;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    iconMap: Record<string, string>;
    categoryColors: Record<string, string>;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({
    hoveredSkill,
    setHoveredSkill,
    selectedCategory,
    setSelectedCategory,
    iconMap,
    categoryColors
}) => {
    const bubbleData = useMemo(() => {
        const getIconUrl = (name: string) => {
            const slug = iconMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return `/icons/${slug}.svg`;
        };

        const items = [
            ...SKILLS_RESUME.languages.map(s => ({ name: s as string, cat: 'Languages', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.frameworks.map(s => ({ name: s as string, cat: 'Frameworks', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.backend_apis.map(s => ({ name: s as string, cat: 'Backend & APIs', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.data_db.map(s => ({ name: s as string, cat: 'Data & DB', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.cloud_infra.map(s => ({ name: s as string, cat: 'Cloud & Infra', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.devops_ops.map(s => ({ name: s as string, cat: 'DevOps & Ops', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.testing_quality.map(s => ({ name: s as string, cat: 'Testing & Quality', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.tools_collab.map(s => ({ name: s as string, cat: 'Tools & Collab', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.ai_analytics.map(s => ({ name: s as string, cat: 'AI & Analytics', icon: getIconUrl(s as string) })),
            ...SKILLS_RESUME.coursework.map(s => ({ name: s as string, cat: 'Coursework', icon: getIconUrl(s as string) }))
        ];

        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const cols = 8;
        const rows = Math.ceil(shuffled.length / cols);

        return shuffled.map((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const jitterX = Math.random() * 12 - 6;
            const jitterY = Math.random() * 12 - 6;

            const left = (col * (100 / cols) + (100 / cols / 2)) + jitterX;
            const top = (row * (100 / rows) + (100 / rows / 2)) + jitterY;

            return {
                ...item,
                left: `${Math.max(5, Math.min(95, left))}%`,
                top: `${Math.max(5, Math.min(95, top))}%`,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * -5,
                floatX: Math.random() * 12 - 6,
                floatY: Math.random() * 12 - 6,
                color: categoryColors[item.cat] || 'gray'
            };
        });
    }, [iconMap, categoryColors]);

    return (
        <div className="relative w-full lg:w-[72%] h-[550px] lg:h-full overflow-hidden group/matrix cursor-pointer" onClick={() => { setSelectedCategory('All'); setHoveredSkill(null); }}>
            {bubbleData.map((item) => (
                <SkillBubble
                    key={item.name}
                    item={item}
                    isHovered={hoveredSkill === item.name}
                    isInSelectedCategory={selectedCategory === item.cat}
                    isFreeMode={selectedCategory === 'All'}
                    onMouseEnter={() => setHoveredSkill(item.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={setSelectedCategory}
                />
            ))}
        </div>
    );
};
