import fs from 'fs';
import path from 'path';

const iconDir = './public/icons';

const icons = {
    // 1. Core Java (Coffee Cup)
    'corejava': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#EA2D2E" d="M100 40H80V20c0-5.5-4.5-10-10-10H30c-5.5 0-10 4.5-10 10v60c0 11 9 20 20 20h40c11 0 20-9 20-20V70h10c5.5 0 10-4.5 10-10s-4.5-10-10-10zM80 70H40V30h40v40zm20-10H90V50h10v10z"/><path fill="#333" d="M30 110h60v8H30z"/></svg>`,

    // 2. Spring Boot (The Leaf Circle)
    'springboot': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#6DB33F"/><path fill="#FFF" d="M64 24c-22.1 0-40 17.9-40 40 0 32 40 40 40 40s40-8 40-40c0-22.1-17.9-40-40-40zM48 64c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16-16-7.2-16-16z"/></svg>`,

    // 3. Kafka (Specific circular logo variant)
    'kafka': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#000" d="M64 10C34.2 10 10 34.2 10 64s24.2 54 54 54 54-24.2 54-54S93.8 10 64 10zm0 98c-24.3 0-44-19.7-44-44s19.7-44 44-44 44 19.7 44 44-19.7 44-44 44z"/><path fill="#000" d="M40 64h48l-24-30z"/></svg>`,

    // 4. JPA (ORM icon - objects over DB)
    'jpa': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="24" y="24" width="30" height="30" rx="4" fill="#6366F1"/><rect x="74" y="24" width="30" height="30" rx="4" fill="#6366F1"/><ellipse cx="64" cy="90" rx="40" ry="15" fill="#4B5563"/><path d="M40 54v20M89 54v20" stroke="#6366F1" stroke-width="4"/></svg>`,

    // 5. JDBC (Connection bridge)
    'jdbc': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M20 80h88" stroke="#10b981" stroke-width="8"/><rect x="10" y="60" width="30" height="40" fill="#333"/><rect x="88" y="60" width="30" height="40" fill="#333"/><path d="M64 20v60" stroke="#10b981" stroke-width="4" stroke-dasharray="10"/></svg>`,

    // 6. .NET (Solid purple brand)
    'dotnet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#512BD4"/><text x="64" y="80" font-family="Arial" font-size="40" fill="white" text-anchor="middle" font-weight="bold">.NET</text></svg>`,

    // 7. Data Modeling (Relationships)
    'datamodeling': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="10" y="10" width="40" height="30" rx="4" fill="#3B82F6"/><rect x="78" y="50" width="40" height="30" rx="4" fill="#3B82F6"/><rect x="10" y="88" width="40" height="30" rx="4" fill="#3B82F6"/><path d="M50 25h15v40h13M50 25h15v78h-25" fill="none" stroke="#3B82F6" stroke-width="4"/></svg>`,

    // 8. CloudWatch (Gauge/Meter)
    'cloudwatch': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#FF9900" d="M64 20c-24.3 0-44 19.7-44 44h88c0-24.3-19.7-44-44-44z"/><path d="M64 64L40 30" stroke="#333" stroke-width="6" stroke-linecap="round"/><circle cx="64" cy="64" r="8" fill="#333"/></svg>`,

    // 9. Azure Monitor (Pulse)
    'azuremonitor': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="10" y="10" width="108" height="108" rx="20" fill="#0078D4"/><path fill="none" stroke="white" stroke-width="6" d="M30 64h15l10-25 10 50 10-25h23" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    // 10. TDD (Cycle)
    'tdd': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="none" stroke="#EF4444" stroke-width="8" d="M64 20a44 44 0 0 1 44 44" stroke-linecap="round"/><path fill="none" stroke="#10B981" stroke-width="8" d="M108 64a44 44 0 0 1-88 0" stroke-linecap="round"/><path fill="none" stroke="#3B82F6" stroke-width="8" d="M20 64a44 44 0 0 1 44-44" stroke-linecap="round"/></svg>`,

    // 11. Code Review (Eye/Glass)
    'codereview': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="40" fill="none" stroke="#6366F1" stroke-width="8"/><circle cx="64" cy="64" r="15" fill="#6366F1"/><path d="M24 64c0-20 40-20 40-20s40 0 40 20-40 20-40 20-40 0-40-20" opacity="0.3" fill="#6366F1"/></svg>`,

    // 12. LLM Integration (Brain + API)
    'llmintegration': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#8B5CF6" d="M64 20c-20 0-35 15-35 35 0 10 5 20 12 26l3 19h40l3-19c7-6 12-16 12-26 0-20-15-35-35-35z"/><path fill="#DDD" d="M50 110h28v8H50z"/></svg>`,

    // 13. Python Pipelines (Snake + Gears)
    'pythonpipelines': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#3776AB" d="M64 10c-30 0-28 13-28 13v10h28v4H30v15c0 0-1 18 20 18h10v-14c0 0 0-16 18-16h14V23s2-13-28-13zm-12 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/><path fill="#FFD43B" d="M64 118c30 0 28-13 28-13v-10H64v-4h34V76c0 0 1-18-20-18H68v14c0 0 0 16-18 16H36v17s-2 13 28 13zm12-7a4 4 0 1 1 0-8 4 4 0 0 1 0-8z"/><circle cx="64" cy="64" r="15" fill="#AAA" stroke="#333" stroke-width="2"/></svg>`
};

Object.entries(icons).forEach(([name, svg]) => {
    fs.writeFileSync(path.join(iconDir, `${name}.svg`), svg);
    console.log(`Generated unique: ${name}.svg`);
});
