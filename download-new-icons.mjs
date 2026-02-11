import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New icons to download from Devicon
const NEW_ICONS = {
    'graphql': 'graphql',
    'hibernate': 'hibernate',
    'gradle': 'gradle',
    'maven': 'maven',
    'jira': 'jira',
    'confluence': 'confluence',
    'sonarqube': 'sonarqube',
    'githubactions': 'github', // fallback to github for now or check if there's a specific one
    'junit': 'java', // fallback
    'mockito': 'java', // fallback
};

const outputDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Downloading ${Object.keys(NEW_ICONS).length} new icons...`);

let completed = 0;
let failed = [];

Object.entries(NEW_ICONS).forEach(([name, slug]) => {
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
    const outputPath = path.join(outputDir, `${name}.svg`);

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream(outputPath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                completed++;
                console.log(`✓ Downloaded: ${name}.svg`);

                if (completed + failed.length === Object.keys(NEW_ICONS).length) {
                    console.log('\n=== Download Complete ===');
                    console.log(`Success: ${completed}`);
                    console.log(`Failed: ${failed.length}`);
                }
            });
        } else {
            completed++;
            failed.push(name);
            console.log(`✗ Failed: ${name} (HTTP ${response.statusCode})`);
        }
    }).on('error', (err) => {
        completed++;
        failed.push(name);
        console.error(`✗ Error downloading ${name}:`, err.message);
    });
});
