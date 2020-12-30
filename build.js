import { minify } from 'terser';
import { mkdirSync, readFileSync, rmdirSync, writeFileSync } from 'fs';

const buildDir = './build';
rmdirSync(buildDir, { recursive: true });
mkdirSync(buildDir);

minify(readFileSync('./seq.js').toString(), { module: true, toplevel: true })
.then(k => writeFileSync(`${buildDir}/seq.js`, k.code));