import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createApp, openAPIConfig } from '../src/app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves from root/server/scripts/ to root/docs/openapi.json
const outputPath = path.resolve(__dirname, '../../docs/openapi.json');

const app = createApp();
const doc = app.getOpenAPIDocument(openAPIConfig);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(doc, null, 2), 'utf-8');

console.log(`OpenAPI spec successfully generated at: ${outputPath}`);
