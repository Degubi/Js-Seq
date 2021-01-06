import { minify } from 'terser';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

unlinkSync('./build/seq.js');

minify(readFileSync('./src/seq.js').toString(), { ecma: 2016, module: true, mangle: { properties: { regex: /^_/ } } })
.then(k => writeFileSync(`./build/seq.js`, k.code));