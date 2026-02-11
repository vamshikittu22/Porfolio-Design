import fs from 'fs';
import path from 'path';

const iconDir = './public/icons';

const icons = {
    // 1. Maven (Distinct M logo)
    'maven': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#C3112E" d="M11.9 19.3L2 108.7h16.4l7.1-55.4 18.2 55.4h14.7l18.2-55.4 7.1 55.4H101l-10-89.4H74.3L64 56.4 53.7 19.3z"/><path fill="#303A92" d="M116.1 12.3c-2.4 0-4.3 1.9-4.3 4.3v100.3c0 2.4 1.9 4.3 4.3 4.3s4.3-1.9 4.3-4.3V16.6c0-2.4-1.9-4.3-4.3-4.3z"/></svg>`,

    // 2. JIRA (Atlassian Blue Triangle)
    'jira': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#0052CC" d="M69.9 10.2L10.2 69.9l19.8 19.8 59.7-59.7z"/><path fill="#2684FF" d="M89.7 30l-59.7 59.7 19.8 19.8 59.7-59.7z"/></svg>`,

    // 3. Spring Boot (Green Leaf with Circle)
    'springboot': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#6DB33F"/><path fill="#FFF" d="M64 24c-22.1 0-40 17.9-40 40 0 32 40 40 40 40s40-8 40-40c0-22.1-17.9-40-40-40zM48 64c0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16-16-7.2-16-16z"/></svg>`,

    // 4. OpenAI (Classic Spiral)
    'openai': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#202123" d="M120.5 54c-2.6-6.6-8.5-11.8-15.5-13.8 3.9-5.6 5-12.7 3.1-19.3-1.9-6.6-6.6-11.8-12.9-14.1l-.8-.3c-6.8-2.4-14.3-1.4-20.3 2.6-5.6-3.9-12.7-5-19.3-3.1-6.6 2.1-11.8 7.3-14.1 13.6l-.3.8c-2.4 6.8-1.4 14.3 2.6 20.3-3.9 5.6-5 12.7-3.1 19.3 1.9 6.6 6.6 11.8 12.9 14.1l.8.3c6.8 2.4 14.3 1.4 20.3-2.6 5.6 3.9 12.7 5 19.3 3.1 6.6-2.1 11.8-7.3 14.1-13.6l.3-.8c2.4-6.8 1.4-14.3-2.6-20.3 3.9-5.6 5-12.7 3.1-19.3zM64 78c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14z"/></svg>`,

    // 5. GraphQL (Hexagon with dots)
    'graphql': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#E10098" d="M12.4 90.3l-.8-1.5V39.2l.8-1.5 44.1-25.5 1.5-.9 1.5.9 44.1 25.5.8 1.5v49.6l-.8 1.5-44.1 25.5-1.5.9-1.5-.9L12.4 90.3zM64 118l41.6-24V34L64 10 22.4 34v60L64 118z"/><circle cx="64" cy="64" r="14" fill="#E10098"/><circle cx="64" cy="14" r="8" fill="#E10098"/><circle cx="64" cy="114" r="8" fill="#E10098"/><circle cx="20" cy="39" r="8" fill="#E10098"/><circle cx="108" cy="39" r="8" fill="#E10098"/><circle cx="20" cy="89" r="8" fill="#E10098"/><circle cx="108" cy="89" r="8" fill="#E10098"/></svg>`,

    // 6. SonarQube (Wave logo)
    'sonarqube': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#4E9BCD" d="M64 10C34.2 10 10 34.2 10 64s24.2 54 54 54 54-24.2 54-54S93.8 10 64 10zm-4 84c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/><path fill="#4E9BCD" d="M64 54c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" opacity="0.6"/><path fill="#F3702A" d="M94 64c0 16.6-13.4 30-30 30s-30-13.4-30-30 13.4-30 30-30 30 13.4 30 30z" opacity="0.2"/></svg>`,

    // 7. Gradle (Elephant swirl)
    'gradle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#02303A" d="M64 10C34.2 10 10 34.2 10 64s24.2 54 54 54 54-24.2 54-54S93.8 10 64 10zm0 98c-24.3 0-44-19.7-44-44s19.7-44 44-44 44 19.7 44 44-19.7 44-44 44z"/><path fill="#02303A" d="M74 44c-10 0-18 8-18 18s8 18 18 18 18-8 18-18-8-18-18-18zm0 28c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/></svg>`,

    // 8. Confluence (Dual Diamond)
    'confluence': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#0052CC" d="M64 10L10 64l54 54 54-54L64 10zm0 98L20 64l44-44 44 44-44 44z"/><path fill="#2684FF" d="M64 30L30 64l34 34 34-34L64 30zm0 58l-24-24 24-24 24 24-24 24z"/></svg>`
};

Object.entries(icons).forEach(([name, svg]) => {
    fs.writeFileSync(path.join(iconDir, `${name}.svg`), svg);
    console.log(`Regenerated: ${name}.svg`);
});
