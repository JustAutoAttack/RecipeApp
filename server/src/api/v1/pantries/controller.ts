import { RouteHandler } from '@hono/zod-openapi';

import {
	createPantryItemRoute,
	deletePantryItemRoute,
	listPantryRoute,
	updatePantryItemRoute
} from './routes';
import { pantriesService } from './service';

export const handleListPantry: RouteHandler<typeof listPantryRoute> = async (
	ctx
) => {
	const userId = 'usr_123456';
	const query = ctx.req.valid('query');
	const { data, total } = await pantriesService.listItems(userId, query);
	return ctx.json(
		{ data, total, limit: query.limit, offset: query.offset },
		200
	);
};

export const handleCreatePantryItem: RouteHandler<
	typeof createPantryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const body = ctx.req.valid('json');
	const item = await pantriesService.createItem(userId, body);
	return ctx.json(item, 201);
};

export const handleUpdatePantryItem: RouteHandler<
	typeof updatePantryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	const body = ctx.req.valid('json');
	const updated = await pantriesService.updateItem(id, userId, body);
	if (!updated) return ctx.json({ error: 'Pantry item not found' }, 404);
	return ctx.json(updated, 200);
};

export const handleDeletePantryItem: RouteHandler<
	typeof deletePantryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	const deleted = await pantriesService.deleteItem(id, userId);
	if (!deleted) return ctx.json({ error: 'Pantry item not found' }, 404);
	return ctx.json(
		{ success: true, message: 'Item removed successfully' },
		200
	);
};
