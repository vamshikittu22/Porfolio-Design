import fs from 'fs';
import path from 'path';

const iconDir = './public/icons';

const icons = {
    // 1. Data/JDBC/JPA (Cylindrical data flow)
    'database': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><ellipse cx="64" cy="30" rx="40" ry="20" fill="#4B5563"/><path d="M24 30v60c0 11 18 20 40 20s40-9 40-20V30" fill="#4B5563"/><ellipse cx="64" cy="30" rx="40" ry="20" fill="#9CA3AF"/><path d="M24 50c0 11 18 20 40 20s40-9 40-20" fill="none" stroke="#D1D5DB" stroke-width="2"/><path d="M24 70c0 11 18 20 40 20s40-9 40-20" fill="none" stroke="#D1D5DB" stroke-width="2"/></svg>`,

    // 2. GitHub Actions (The rocket/flow icon)
    'githubactions': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="10" y="10" width="108" height="108" rx="20" fill="#2088FF"/><path fill="#FFF" d="M35 35h58v10H35zm0 24h30v10H35zm0 24h58v10H35z"/><circle cx="93" cy="64" r="15" fill="#FFF" opacity="0.8"/></svg>`,

    // 3. Testing (Magnifying glass over code)
    'testing': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#6366F1" d="M20 20h88v88H20z" opacity="0.1"/><path fill="none" stroke="#6366F1" stroke-width="4" d="M40 40h48M40 60h48M40 80h30"/><circle cx="85" cy="85" r="25" fill="none" stroke="#6366F1" stroke-width="6"/><line x1="103" y1="103" x2="120" y2="120" stroke="#6366F1" stroke-width="8" stroke-linecap="round"/></svg>`,

    // 4. Observability (Pulse/Graph)
    'observability': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="none" stroke="#F43F5E" stroke-width="6" d="M10 80h20l10-40 20 60 20-80 20 60h18" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

Object.entries(icons).forEach(([name, svg]) => {
    fs.writeFileSync(path.join(iconDir, `${name}.svg`), svg);
    console.log(`Updated technical: ${name}.svg`);
});
