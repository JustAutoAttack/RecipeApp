import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const authRouter = new OpenAPIHono();

authRouter.openapi(routes.signUpRoute, controller.handleSignUp);
authRouter.openapi(routes.signInRoute, controller.handleSignIn);
authRouter.openapi(routes.refreshRoute, controller.handleRefresh);
authRouter.openapi(routes.signOutRoute, controller.handleSignOut);
