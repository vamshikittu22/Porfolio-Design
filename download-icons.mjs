import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon mapping from AboutSection.tsx
const ICON_MAP = {
    'Java (8-17)': 'java',
    'Core Java': 'java',
    'Spring Boot': 'spring',
    '.NET Core': 'dotnetcore',
    'React.js': 'react',
    'HTML5': 'html5',
    'CSS3': 'css3',
    'Python': 'python',
    'C': 'c',
    'C#': 'csharp',
    'PHP': 'php',
    'JavaScript': 'javascript',
    'TypeScript': 'typescript',
    'SQL Server': 'microsoftsqlserver',
    'SQL': 'mysql',
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'Oracle': 'oracle',
    'MongoDB': 'mongodb',
    'DynamoDB': 'amazondynamodb',
    'AWS (ECS/EKS/Lambda)': 'amazonwebservices',
    'Docker': 'docker',
    'Kafka': 'apachekafka',
    'Jenkins': 'jenkins',
    'Terraform': 'terraform',
    'VS Code': 'vscode',
    'Git': 'git',
    'GitHub': 'github',
    'Gemini AI': 'googlecloud',
    'Angular': 'angular',
    'Vue.js': 'vuejs',
    'Node.js': 'nodejs',
    'Postman': 'postman',
    'Distributed Systems': 'linux',
    'Cloud Computing': 'googlecloud',
    'AI': 'tensorflow',
    'Data Warehousing': 'postgresql',
    'Information Security': 'linux'
};

const outputDir = path.join(__dirname, 'public', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get unique icon slugs
const uniqueSlugs = [...new Set(Object.values(ICON_MAP))];

console.log(`Downloading ${uniqueSlugs.length} unique icons...`);

let completed = 0;
let failed = [];

uniqueSlugs.forEach((slug) => {
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
    const outputPath = path.join(outputDir, `${slug}.svg`);

    https.get(url, (response) => {
        if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream(outputPath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                completed++;
                console.log(`✓ Downloaded: ${slug}.svg (${completed}/${uniqueSlugs.length})`);

                if (completed + failed.length === uniqueSlugs.length) {
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
            failed.push(slug);
            console.log(`✗ Failed: ${slug} (HTTP ${response.statusCode})`);

            if (completed + failed.length === uniqueSlugs.length) {
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
        failed.push(slug);
        console.error(`✗ Error downloading ${slug}:`, err.message);

        if (completed + failed.length === uniqueSlugs.length) {
            console.log('\n=== Download Complete ===');
            console.log(`Success: ${completed - failed.length}`);
            console.log(`Failed: ${failed.length}`);
            if (failed.length > 0) {
                console.log('Failed icons:', failed.join(', '));
            }
        }
    });
});
