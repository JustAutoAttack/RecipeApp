import { createRoute } from '@hono/zod-openapi';
import {
	AuthTokensSchema,
	ErrorSchema,
	RefreshResponseSchema,
	RefreshSchema,
	SignInSchema,
	SignOutResponseSchema,
	SignUpSchema
} from './schemas';

export const signUpRoute = createRoute({
	method: 'post',
	path: '/sign-up',
	tags: ['Auth'],
	summary: 'Register New Account',
	description:
		'Creates a new user account and returns active session tokens.',
	request: {
		body: {
			content: {
				'application/json': { schema: SignUpSchema }
			}
		}
	},
	responses: {
		201: {
			content: { 'application/json': { schema: AuthTokensSchema } },
			description: 'User registered successfully'
		},
		400: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'User already exists or validation failed'
		}
	}
});

export const signInRoute = createRoute({
	method: 'post',
	path: '/sign-in',
	tags: ['Auth'],
	summary: 'Authenticate User',
	description: 'Verifies credentials and creates a new JWT session.',
	request: {
		body: {
			content: {
				'application/json': { schema: SignInSchema }
			}
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: AuthTokensSchema } },
			description: 'Authenticated successfully'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Invalid credentials'
		}
	}
});

export const refreshRoute = createRoute({
	method: 'post',
	path: '/refresh',
	tags: ['Auth'],
	summary: 'Refresh Access Token',
	description:
		'Validates refresh token/session and returns a new active access token.',
	request: {
		body: {
			content: {
				'application/json': { schema: RefreshSchema }
			}
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: RefreshResponseSchema } },
			description: 'Token refreshed successfully'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Invalid or expired refresh token'
		}
	}
});

export const signOutRoute = createRoute({
	method: 'post',
	path: '/sign-out',
	tags: ['Auth'],
	summary: 'Sign Out',
	description: 'Invalidates the active session and refresh token.',
	request: {
		body: {
			content: {
				'application/json': { schema: RefreshSchema }
			}
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: SignOutResponseSchema } },
			description: 'Session terminated'
		}
	}
});
