import { minify } from 'terser';
import { mkdirSync, readFileSync, rmdirSync, writeFileSync } from 'fs';

const buildDir = './build';
rmdirSync(buildDir, { recursive: true });
mkdirSync(buildDir);

minify(readFileSync('./src/seq.js').toString(), { ecma: 2016, module: true, mangle: { properties: { regex: /^_/ } } })
.then(k => writeFileSync(`${buildDir}/seq.js`, k.code));