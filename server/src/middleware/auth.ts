import { createMiddleware } from 'hono/factory';
import { JwtService } from '../services';
import { AuthContext } from '../types';

// Extend Hono's context types to include user
declare module 'hono' {
	interface ContextVariableMap {
		auth: AuthContext | null;
	}
}

export const authMiddleware = createMiddleware(async (c, next) => {
	const authHeader = c.req.header('Authorization');

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		c.set('user', null);
		return await next();
	}

	const token = authHeader.split(' ')[1];
	const payload = JwtService.verifyAccessToken(token);

	c.set('user', payload);
	return await next();
});

// Guard wrapper for strictly protected routes
export const requireAuth = createMiddleware(async (c, next) => {
	const auth = c.get('user');

	if (!auth) {
		return c.json(
			{ success: false, error: 'Unauthorized: Authentication required' },
			401
		);
	}

	return await next();
});
