import { RouteHandler } from '@hono/zod-openapi';
import { refreshRoute, signInRoute, signOutRoute, signUpRoute } from './routes';
import { authService } from './service';

export const handleSignUp: RouteHandler<typeof signUpRoute> = async (ctx) => {
	const body = ctx.req.valid('json');
	const result = await authService.signUp(body);
	return ctx.json(result, 201);
};

export const handleSignIn: RouteHandler<typeof signInRoute> = async (ctx) => {
	const body = ctx.req.valid('json');
	const result = await authService.signIn(body);
	return ctx.json(result, 200);
};

export const handleRefresh: RouteHandler<typeof refreshRoute> = async (ctx) => {
	const { refreshToken } = ctx.req.valid('json');
	const result = await authService.refreshSession(refreshToken);
	return ctx.json(result, 200);
};

export const handleSignOut: RouteHandler<typeof signOutRoute> = async (ctx) => {
	const { refreshToken } = ctx.req.valid('json');
	const result = await authService.signOut(refreshToken);
	return ctx.json(result, 200);
};
