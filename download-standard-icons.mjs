import https from 'https';
import fs from 'fs';
import path from 'path';

const icons = {
    'maven': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg',
    'jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'graphql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'sonarqube': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg',
    'gradle': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',
    'confluence': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg',
    'spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
};

const outputDir = './public/icons';

Object.entries(icons).forEach(([name, url]) => {
    https.get(url, (res) => {
        if (res.statusCode === 200) {
            const fileStream = fs.createWriteStream(path.join(outputDir, `${name}.svg`));
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${name}.svg`);
            });
        } else {
            console.log(`Failed ${name}: ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.log(`Error ${name}: ${err.message}`);
    });
});
