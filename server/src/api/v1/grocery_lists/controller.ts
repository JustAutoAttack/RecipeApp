import { RouteHandler } from '@hono/zod-openapi';

import {
	addGroceryItemRoute,
	createGroceryListRoute,
	deleteGroceryItemRoute,
	getGroceryListByIdRoute,
	listGroceryListsRoute,
	updateGroceryItemRoute
} from './routes';
import { groceryListsService } from './service';

export const handleListGroceryLists: RouteHandler<
	typeof listGroceryListsRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const lists = await groceryListsService.listLists(userId);
	return ctx.json(lists, 200);
};

export const handleCreateGroceryList: RouteHandler<
	typeof createGroceryListRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const body = ctx.req.valid('json');
	const list = await groceryListsService.createList(userId, body);
	return ctx.json(list, 201);
};

export const handleGetGroceryListById: RouteHandler<
	typeof getGroceryListByIdRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	const list = await groceryListsService.getListById(id, userId);
	if (!list) return ctx.json({ error: 'Grocery list not found' }, 404);
	return ctx.json(list, 200);
};

export const handleAddGroceryItem: RouteHandler<
	typeof addGroceryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	const body = ctx.req.valid('json');
	const item = await groceryListsService.addItem(id, userId, body);
	if (!item) return ctx.json({ error: 'Grocery list not found' }, 404);
	return ctx.json(item, 201);
};

export const handleUpdateGroceryItem: RouteHandler<
	typeof updateGroceryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id, itemId } = ctx.req.valid('param');
	const body = ctx.req.valid('json');
	const updated = await groceryListsService.updateItem(
		id,
		itemId,
		userId,
		body
	);
	if (!updated)
		return ctx.json({ error: 'Grocery list or item not found' }, 404);
	return ctx.json(updated, 200);
};

export const handleDeleteGroceryItem: RouteHandler<
	typeof deleteGroceryItemRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id, itemId } = ctx.req.valid('param');
	const deleted = await groceryListsService.deleteItem(id, itemId, userId);
	if (!deleted)
		return ctx.json({ error: 'Grocery list or item not found' }, 404);
	return ctx.json({ success: true, message: 'Item removed from list' }, 200);
};
