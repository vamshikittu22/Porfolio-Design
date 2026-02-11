import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Missing icons to download
const MISSING_ICONS = {
    'kubernetes': 'kubernetes',
    'apachekafka': 'apachekafka',
    'azure': 'azure',
    'googlecloud': 'googlecloud',
};

const outputDir = path.join(__dirname, 'public', 'icons');

console.log(`Downloading ${Object.keys(MISSING_ICONS).length} missing icons...`);

let completed = 0;
let failed = [];

Object.entries(MISSING_ICONS).forEach(([name, slug]) => {
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

                if (completed + failed.length === Object.keys(MISSING_ICONS).length) {
                    console.log('\n=== Download Complete ===');
                    console.log(`Success: ${completed}`);
                    console.log(`Failed: ${failed.length}`);
                    if (failed.length > 0) {
                        console.log('Failed icons:', failed.join(', '));
                    }
                }
            });
        } else {
            completed++;
            failed.push(name);
            console.log(`✗ Failed: ${name} (HTTP ${response.statusCode})`);

            if (completed + failed.length === Object.keys(MISSING_ICONS).length) {
                console.log('\n=== Download Complete ===');
                console.log(`Success: ${completed - failed.length}`);
                console.log(`Failed: ${failed.length}`);
                if (failed.length > 0) {
                    console.log('Failed icons:', failed.join(', '));
                }
            }
        }
    }).on('error', (err) => {
        completed++;
        failed.push(name);
        console.error(`✗ Error downloading ${name}:`, err.message);

        if (completed + failed.length === Object.keys(MISSING_ICONS).length) {
            console.log('\n=== Download Complete ===');
            console.log(`Success: ${completed - failed.length}`);
            console.log(`Failed: ${failed.length}`);
            if (failed.length > 0) {
                console.log('Failed icons:', failed.join(', '));
            }
        }
    });
});
