import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import { requestMiddleware, responseMiddleware } from './core';
import { healthRouter } from './health';
import { apiRouter } from './api';

export const openAPIConfig = {
	openapi: '3.0.0',
	info: {
		title: 'Mise Server API',
		version: '1.0.0',
		description: 'API documentation for Mise backend services'
	}
} as const;

export function createApp(): OpenAPIHono {
	const app = new OpenAPIHono();

	// Middleware
	app.use('*', logger());
	app.use('*', cors());
	app.use('*', responseMiddleware);
	app.use('*', requestMiddleware);

	// Routes
	app.route('/health', healthRouter);
	app.route('/api', apiRouter);

	// OpenAPI v3.0 Specification Endpoint
	app.doc('/doc', openAPIConfig);

	// Interactive Swagger UI
	app.get('/swagger', swaggerUI({ url: '/doc' }));

	return app;
}
