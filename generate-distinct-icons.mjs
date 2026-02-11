// 1. GraphQL
const graphql = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#E10098" d="M12.4 90.3l-.8-1.5V39.2l.8-1.5 44.1-25.5 1.5-.9 1.5.9 44.1 25.5.8 1.5v49.6l-.8 1.5-44.1 25.5-1.5.9-1.5-.9L12.4 90.3zM64 118l41.6-24V34L64 10 22.4 34v60L64 118z"/><path fill="#E10098" d="M64 110V18.1L24.2 41v45.9L64 110z"/><path fill="#E10098" d="M64 110l39.8-23V41L64 18.1V110z"/></svg>`;

// 2. Apache Pulsar (Conceptual)
const pulsar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#188fff" d="M64 10L10 37v54l54 27 54-27V37L64 10zm0 98L20 86V42l44-22 44 22v44l-44 22z"/><path fill="#188fff" d="M64 30c-18.8 0-34 15.2-34 34s15.2 34 34 34 34-15.2 34-34-15.2-34-34-34zm0 60c-14.4 0-26-11.6-26-26s11.6-26 26-26 26 11.6 26 26-11.6 26-26 26z"/></svg>`;

// 3. BigQuery
const bigquery = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#4285F4" d="M100 40H28v8h72v-8zm0 16H28v8h72v-8zm0 16H28v8h72v-8z"/><path fill="#4285F4" d="M112 12H16c-4.4 0-8 3.6-8 8v88c0 4.4 3.6 8 8 8h96c4.4 0 8-3.6 8-8V20c0-4.4-3.6-8-8-8zm0 96H16V20h96v88z"/><circle cx="90" cy="90" r="15" fill="#34A853" opacity="0.8"/></svg>`;

// 4. OpenAI
const openai = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#74aa9c" d="M110.1 76.5c2-6.6 1.1-13.8-2.6-19.7 3.9-5.6 5-12.7 3.1-19.3-1.9-6.6-6.6-11.8-12.9-14.1l-.8-.3c-6.8-2.4-14.3-1.4-20.3 2.6-5.6-3.9-12.7-5-19.3-3.1-6.6 1.9-11.8 6.6-14.1 12.9l-.3.8c-2.4 6.8-1.4 14.3 2.6 20.3-3.9 5.6-5 12.7-3.1 19.3 1.9 6.6 6.6 11.8 12.9 14.1l.8.3c6.8 2.4 14.3 1.4 20.3-2.6 5.6 3.9 12.7 5 19.3 3.1 6.6-1.9 11.8-6.6 14.1-12.9l.3-.8zM64 80.5c-9.1 0-16.5-7.4-16.5-16.5s7.4-16.5 16.5-16.5 16.5 7.4 16.5 16.5-7.4 16.5-16.5 16.5z"/></svg>`;

// 5. Microservices
const microservices = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#06b6d4" d="M30 40l10-6 10 6v12l-10 6-10-6V40zm30 30l10-6 10 6v12l-10 6-10-6V70zm-30 30l10-6 10 6v12l-10 6-10-6v-12zM60 40l10-6 10 6v12l-10 6-10-6V40zm30 30l10-6 10 6v12l-10 6-10-6V70z" opacity="0.8"/><path stroke="#06b6d4" stroke-width="2" d="M40 46l20 30M70 46l20 30M40 76l20 30"/></svg>`;

// 6. CI/CD
const cicd = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="none" stroke="#f97316" stroke-width="8" d="M40 40c-20 0-20 48 0 48s48-48 48-48 20 48 40 48c20 0 20-48 0-48s-48 48-48 48-20-48-40-48z"/></svg>`;

// 7. Power BI
const powerbi = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="20" y="70" width="20" height="30" fill="#f2c811"/><rect x="54" y="45" width="20" height="55" fill="#f2c811"/><rect x="88" y="20" width="20" height="80" fill="#f2c811"/></svg>`;

// 8. JUnit (Fixed Distinct)
const junit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="30" y="20" width="68" height="88" rx="8" fill="#f04d27"/><path fill="#fff" d="M45 40h38v8H45zm0 16h38v8H45zm0 16h20v8H45z"/><circle cx="95" cy="95" r="20" fill="#5cb85c"/><path fill="#fff" d="M88 95l4 4 10-10"/></svg>`;

// 9. Mockito (Fixed Distinct)
const mockito = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="50" fill="#eee" stroke="#333" stroke-width="4"/><path d="M40 50h48L64 90z" fill="#ccc"/><circle cx="50" cy="40" r="10" fill="#333"/><circle cx="78" cy="40" r="10" fill="#333"/></svg>`;

// 10. Hibernate
const hibernate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#59626a" d="M100 20H28c-4.4 0-8 3.6-8 8v72c0 4.4 3.6 8 8 8h72c4.4 0 8-3.6 8-8V28c0-4.4-3.6-8-8-8z"/><path fill="#bcae79" d="M40 40h8v48h-8zm32 0h8v48h-8zM40 60h40v8H40z"/></svg>`;

// 11. Event Driven (Conceptual Flash)
const eventdriven = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#facc15" d="M80 10L30 70h30l-10 48 50-60H70l10-48z"/></svg>`;

// Writing all to public/icons
import fs from 'fs';
import path from 'path';

const icons = {
    'graphql': graphql,
    'apachepulsar': pulsar,
    'bigquery': bigquery,
    'openai': openai,
    'microservices': microservices,
    'cicd': cicd,
    'powerbi': powerbi,
    'junit': junit,
    'mockito': mockito,
    'hibernate': hibernate,
    'eventdriven': eventdriven
};

const iconDir = './public/icons';

Object.entries(icons).forEach(([name, svg]) => {
    fs.writeFileSync(path.join(iconDir, `${name}.svg`), svg);
    console.log(`Updated: ${name}.svg`);
});
