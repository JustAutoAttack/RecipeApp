import { serve } from '@hono/node-server';

import { ENV } from './core';
import { createApp } from './app';

try {
	const app = createApp();

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

const baseUrl = `http://localhost:${ENV.PORT}`;
console.log(`Mise server running on ${baseUrl}`);
console.log(`Swagger UI available at ${baseUrl}/swagger`);
console.log(`OpenAPI Spec available at ${baseUrl}/doc`);
