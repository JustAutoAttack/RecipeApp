import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import authRoute from './api/v1/auth/route';
import usersRoute from './api/v1/users/route';
import recipesRoute from './api/v1/recipes/route';

const app = new Hono();

// Health
const healthRoute = new Hono();

healthRoute.get('/', async (c) => {
	return c.json({ success: true });
});

app.route('/health', healthRoute);

// Middleware
app.use('*', logger());
app.use('*', cors());

// API Version 1 Group
const v1 = new Hono()
	.route('/auth', authRoute)
	.route('/users', usersRoute)
	.route('/recipes', recipesRoute);

app.route('/api/v1', v1);

const port = 3000;
console.log(`🚀 Mise server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
