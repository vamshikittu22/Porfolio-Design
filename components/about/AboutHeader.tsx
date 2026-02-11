import React from 'react';

export const AboutHeader: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
            <div className="flex flex-col gap-4">
                <div className="h-px w-20 bg-t-accent" />
                <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">About Me</span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
                Executive <br /> <span className="text-t-fg-m opacity-40">Profile.</span>
            </h2>
            <div className="space-y-8 border-l-4 border-t-accent/20 pl-10 py-4 max-w-4xl">
                <p className="text-xl lg:text-2xl text-t-fg font-medium leading-relaxed italic">
                    "Full Stack Software Engineer with 5+ years of experience building scalable, secure enterprise applications across healthcare, financial services, and banking domains."
                </p>
                <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
                    I specialize in Java/Spring Boot microservices and modern frontend architectures using Angular, React, and Vue.js. Currently at CVS Health, I engineer REST and GraphQL APIs for claims processing workflows while integrating AI-assisted analytics using OpenAI APIs. My experience spans from low-latency trading systems at Citadel to digital banking modernization at Mphasis, with a focus on cloud-native deployments, event-driven architectures, and secure authentication using OAuth 2.0 and JWT.
                </p>
                <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
                    I'm passionate about building scalable systems that solve real business problems, whether it's reducing manual review effort through AI automation or optimizing API response times through efficient database design. I'm seeking senior engineering roles where I can leverage my full-stack expertise and cloud architecture experience to drive impactful solutions. Open to opportunities nationwide and excited to contribute to innovative teams building the next generation of enterprise applications.
                </p>
            </div>
        </div>
    );
};
