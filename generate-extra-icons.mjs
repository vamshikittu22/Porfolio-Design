import fs from 'fs';
import path from 'path';

const monitoring = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#10b981" d="M10 100h108v8H10z"/><path fill="#10b981" d="M20 90h15v-30h-15zM50 90h15v-50h-15zM80 90h15v-70h-15z" opacity="0.8"/><path fill="none" stroke="#10b981" stroke-width="4" d="M27 50L57 30L87 15l25 35"/></svg>`;
const restapi = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="10" y="30" width="108" height="68" rx="8" fill="#4ade80" opacity="0.2"/><path fill="#4ade80" d="M30 50h68v6H30zm0 16h68v6H30zm0 16h40v6H30z"/><path fill="#4ade80" d="M20 20h8v8h-8zm16 0h8v8h-8zm16 0h8v8h-8z"/></svg>`;

fs.writeFileSync('./public/icons/monitoring.svg', monitoring);
fs.writeFileSync('./public/icons/restapi.svg', restapi);
console.log('Updated additional: monitoring.svg, restapi.svg');
