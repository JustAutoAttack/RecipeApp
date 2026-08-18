import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { ENV } from '@core';
import * as schema from './schema';

const rawPath = ENV.DATABASE_URL.replace(/^file:/, '');
const dbPath = path.resolve(process.cwd(), rawPath);
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

export const sqlite = new Database(dbPath);

// Performance & data integrity pragmas
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');
sqlite.pragma('synchronous = NORMAL');

export const db = drizzle(sqlite, { schema });

export interface DbHealthResult {
	status: 'up' | 'down';
	latencyMs?: number;
	error?: string;
}

/**
 * Fast synchronous health probe for SQLite database connectivity and latency.
 */
export function checkDbHealth(): DbHealthResult {
	const start = performance.now();
	try {
		const row = sqlite.prepare('SELECT 1 AS alive').get() as
			| { alive: number }
			| undefined;
		if (row?.alive === 1) {
			return {
				status: 'up',
				latencyMs: Number((performance.now() - start).toFixed(2))
			};
		}
		return { status: 'down', error: 'Unexpected query output' };
	} catch (err) {
		return {
			status: 'down',
			error: err instanceof Error ? err.message : 'Database check failed'
		};
	}
}
