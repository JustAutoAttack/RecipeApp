import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const subscriptionsRouter = new OpenAPIHono();

subscriptionsRouter.openapi(
	routes.getMySubscriptionRoute,
	controller.handleGetMySubscription
);
subscriptionsRouter.openapi(
	routes.createCheckoutSessionRoute,
	controller.handleCreateCheckoutSession
);
subscriptionsRouter.openapi(
	routes.createPortalSessionRoute,
	controller.handleCreatePortalSession
);
