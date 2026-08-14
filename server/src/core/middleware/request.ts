import { createMiddleware } from 'hono/factory';

import { sessionsRepo, usersRepo } from '@database';
import { asyncLocalStorageService, cryptoService } from '../services';

export const requestMiddleware = createMiddleware(async (ctx, next) => {
	// Initialize request context state
	const requestContext = {
		serverRequestId: cryptoService.generateId(),
		clientRequestId: ctx.req.header('X-Request-ID'),
		userId: undefined as string | undefined,
		roles: [] as string[]
	};
    
	ctx.header('X-Request-ID', requestContext.serverRequestId);
	if (requestContext.clientRequestId) {
		ctx.header('X-Client-Request-ID', requestContext.clientRequestId);
	}

	// Resolve user session if bearer token is provided
	const authHeader = ctx.req.header('Authorization');
	if (authHeader?.startsWith('Bearer ')) {
		const token = authHeader.replace('Bearer ', '');
		const session = await sessionsRepo.findByToken(token);

		if (session && new Date(session.expires_at) >= new Date()) {
			if (await usersRepo.exists(session.user_id)) {
				requestContext.userId = session.user_id;
				requestContext.roles = ['user'];
			}
		}
	}

	// Bind the context for downstream execution
	return asyncLocalStorageService.run(
		requestContext,
		async () => await next()
	);
});
