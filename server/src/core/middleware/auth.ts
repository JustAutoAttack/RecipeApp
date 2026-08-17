import { createMiddleware } from 'hono/factory';

import { AuthContext, ERROR_STATUS_MAP, ErrorCode, Responses } from '../common';

declare module 'hono' {
	interface ContextVariableMap {
		auth: AuthContext | null;
	}
}

export const requireAuth = createMiddleware(async (ctx, next) => {
	const auth: AuthContext | null = ctx.get('auth');

	if (!auth) {
		return ctx.json(
			Responses.error(ErrorCode.UNAUTHORIZED, 'Authentication required'),
			ERROR_STATUS_MAP[ErrorCode.UNAUTHORIZED]
		);
	}

	return await next();
});
