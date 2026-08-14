import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { ENV } from './core';
import { createApp } from './app';

try {
	const app: Hono = createApp();
	serve({
		fetch: app.fetch,
		port: Number(ENV.PORT)
	});
} catch (error) {
	console.error(
		`Error starting Mise server on http://localhost:${ENV.PORT}:`,
		error
	);
	process.exit(1);
}

console.log(`Mise server running on http://localhost:${ENV.PORT}`);
