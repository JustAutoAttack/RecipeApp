import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import { apiRouter } from './api';
import { requestMiddleware, responseMiddleware } from './core';

export function createApp(): Hono {
	const app = new Hono();

	// Global Infrastructure Middleware
	app.use('*', logger());
	app.use('*', cors());
	app.use('*', responseMiddleware);
	app.use('*', requestMiddleware);

	// Public Health Route
	const healthRouter = new Hono();
	healthRouter.get('/', (ctx) => ctx.json({ success: true }));
	app.route('/health', healthRouter);

	// API Routes
	app.route('/api', apiRouter);

	return app;
}
