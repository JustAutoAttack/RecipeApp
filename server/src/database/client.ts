import fs from 'fs';
import path from 'path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import { ENV } from '@core';
import * as schema from './schema';

const dbPath = path.resolve(process.cwd(), ENV.DATABASE_URL);
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

// Enable WAL mode for better concurrency performance in SQLite
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });
