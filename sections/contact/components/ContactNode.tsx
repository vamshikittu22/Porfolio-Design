import React from 'react';

interface ContactNodeProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    onClick: () => void;
}

export const ContactNode: React.FC<ContactNodeProps> = ({ icon, label, value, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-t-accent-2 hover:bg-white/[0.08] transition-all text-left group"
    >
        <div className="w-10 h-10 rounded-xl bg-t-accent-2/10 flex items-center justify-center text-t-accent-2 group-hover:bg-t-accent-2 group-hover:text-t-bg transition-all">
            {icon}
        </div>
        <div className="flex flex-col overflow-hidden">
            <span className="text-[8px] font-black uppercase tracking-widest text-t-fg opacity-40 group-hover:opacity-100 transition-opacity">{label}</span>
            <span className="text-xs font-bold text-t-fg truncate">{value}</span>
        </div>
    </button>
);
