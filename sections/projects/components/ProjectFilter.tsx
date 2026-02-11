import React from 'react';

interface ProjectFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategorySelect: (cat: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({ categories, selectedCategory, onCategorySelect }) => {
    return (
        <div className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-8">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategorySelect(cat)}
                    className={`
            px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 border
            ${selectedCategory === cat
                            ? 'bg-t-accent text-t-bg border-t-accent shadow-[0_10px_30px_-10px_rgba(var(--color-accent-rgb),0.5)]'
                            : 'bg-transparent text-t-fg-m border-t-border hover:border-t-accent hover:text-t-fg'
                        }
          `}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};
