import { OpenAPIHono } from '@hono/zod-openapi';

import { authRouter } from './auth';
import { usersRouter } from './users';
import { subscriptionsRouter } from './subscriptions';
import { recipesRouter } from './recipes';
import { pantriesRouter } from './pantries';
import { groceryListsRouter } from './grocery_lists';

export const v1Router = new OpenAPIHono();

v1Router.route('/auth', authRouter);
v1Router.route('/users', usersRouter);
v1Router.route('/subscriptions', subscriptionsRouter);
v1Router.route('/recipes', recipesRouter);
v1Router.route('/pantries', pantriesRouter);
v1Router.route('/grocery-lists', groceryListsRouter);
