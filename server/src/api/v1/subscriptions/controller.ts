import { RouteHandler } from '@hono/zod-openapi';

import {
	createCheckoutSessionRoute,
	createPortalSessionRoute,
	getMySubscriptionRoute
} from './routes';
import { subscriptionsService } from './service';

export const handleGetMySubscription: RouteHandler<
	typeof getMySubscriptionRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const sub = await subscriptionsService.getByUserId(userId);
	if (!sub) {
		return ctx.json({ error: 'Subscription not found' }, 404);
	}
	return ctx.json(sub, 200);
};

export const handleCreateCheckoutSession: RouteHandler<
	typeof createCheckoutSessionRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const body = ctx.req.valid('json');
	const url = await subscriptionsService.createCheckoutSession(userId, body);
	return ctx.json({ url }, 200);
};

export const handleCreatePortalSession: RouteHandler<
	typeof createPortalSessionRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const url = await subscriptionsService.createPortalSession(userId);
	return ctx.json({ url }, 200);
};
