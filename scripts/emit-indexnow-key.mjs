/** Copy INDEXNOW_KEY verification file into public/ (and dist/ if present). */
import fs from 'node:fs';
import path from 'node:path';
import { loadDotEnv } from './load-dotenv.mjs';

loadDotEnv();

const key = process.env.INDEXNOW_KEY?.trim();
if (!key) {
  console.log('IndexNow key file: skipped (INDEXNOW_KEY not set).');
  process.exit(0);
}

const root = process.cwd();
const publicFile = path.join(root, 'public', `${key}.txt`);
fs.mkdirSync(path.dirname(publicFile), { recursive: true });
fs.writeFileSync(publicFile, key, 'utf8');

const distFile = path.join(root, 'dist', `${key}.txt`);
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.writeFileSync(distFile, key, 'utf8');
}

console.log(`IndexNow key file: public/${key}.txt`);