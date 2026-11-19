import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const envPath = path.join(root, '.env');
const examplePath = path.join(root, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('.env already exists — no changes.');
  process.exit(0);
}

const key = crypto.randomBytes(16).toString('hex');
const template = fs.existsSync(examplePath)
  ? fs.readFileSync(examplePath, 'utf8')
  : '';
const body =
  template.trim() +
  `\n\nSITE_ORIGIN=https://cheatsbo7.net\nSITEMAP_ORIGIN=https://cheatsbo7.net\nINDEXNOW_KEY=${key}\nINDEXNOW_HOST=cheatsbo7.net\nPUBLIC_GA_MEASUREMENT_ID=\n`;

fs.writeFileSync(envPath, body, 'utf8');
console.log(`Created .env with INDEXNOW_KEY=${key}`);
console.log('Add PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX before deploy for GA4.');