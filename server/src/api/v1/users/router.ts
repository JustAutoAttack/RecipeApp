import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const usersRouter = new OpenAPIHono();

usersRouter.openapi(routes.getMeRoute, controller.handleGetMe);
usersRouter.openapi(routes.updateMeRoute, controller.handleUpdateMe);
usersRouter.openapi(routes.getUserByIdRoute, controller.handleGetUserById);
usersRouter.openapi(routes.followUserRoute, controller.handleFollowUser);
usersRouter.openapi(routes.unfollowUserRoute, controller.handleUnfollowUser);
