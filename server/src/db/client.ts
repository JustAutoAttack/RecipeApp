import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import * as schema from './schema';

// Connect to your local server SQLite database file
const sqlite = new Database('mise_server.db');

// Enable WAL mode for better concurrency performance in SQLite
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });
