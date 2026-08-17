import { Hono } from 'hono';

import { authRouter } from './auth';
import { usersRouter } from './users';
import { recipesRouter } from './recipes';

export const v1Router = new Hono();

v1Router.route('/auth', authRouter);
v1Router.route('/users', usersRouter);
v1Router.route('/recipes', recipesRouter);
