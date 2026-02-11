import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkillSpec } from '../../config/skillSpecs';

interface SkillBriefProps {
    skillName: string | null;
}

export const SkillBrief: React.FC<SkillBriefProps> = ({ skillName }) => {
    const spec = skillName ? getSkillSpec(skillName) : null;

    return (
        <div className="flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
                {!skillName ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center p-6"
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-6">
                            <span className="text-white/20 text-2xl">?</span>
                        </div>
                        <h3 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-2">Capability Insight</h3>
                        <p className="text-white/20 text-xs max-w-[200px]">
                            Hover over any node in the matrix to view specialized proficiency and project history.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={skillName}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-mono text-t-accent uppercase tracking-[0.3em]">Skill Identity</span>
                                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{spec?.exp}</span>
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                {skillName}
                            </h3>
                            <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest border-b border-white/5 pb-4">
                                {spec?.role}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-1 h-1 bg-t-accent rounded-full" />
                                    Experience Depth
                                </h4>
                                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                                    <p className="text-sm text-white/80 leading-relaxed italic">
                                        "{spec?.desc}"
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Key Strength</span>
                                    <span className="text-xs font-bold text-t-accent uppercase tracking-wider">{spec?.strength}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Validated At</span>
                                    <span className="text-xs font-medium text-white/90 uppercase tracking-wide">{spec?.usedIn}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-help group">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono text-white group-hover:bg-t-accent/20 group-hover:text-t-accent">i</div>
                    <p className="text-[9px] font-mono leading-tight text-white/50 group-hover:text-white/80">
                        Professional competency verified through peer reviews & enterprise delivery.
                    </p>
                </div>
            </div>
        </div>
    );
};
