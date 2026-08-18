import { createRoute } from '@hono/zod-openapi';

import {
	AddGroceryItemSchema,
	CreateGroceryListSchema,
	GroceryActionResponseSchema,
	GroceryErrorSchema,
	GroceryItemParamSchema,
	GroceryItemSchema,
	GroceryListParamSchema,
	GroceryListSchema,
	UpdateGroceryItemSchema
} from './schemas';

export const listGroceryListsRoute = createRoute({
	method: 'get',
	path: '/',
	tags: ['Grocery Lists'],
	summary: 'List Grocery Lists',
	description: 'Retrieves all grocery lists owned by the active user.',
	responses: {
		200: {
			content: {
				'application/json': { schema: GroceryListSchema.array() }
			},
			description: 'Grocery lists retrieved'
		}
	}
});

export const createGroceryListRoute = createRoute({
	method: 'post',
	path: '/',
	tags: ['Grocery Lists'],
	summary: 'Create Grocery List',
	description: 'Creates a new empty grocery list.',
	request: {
		body: {
			content: { 'application/json': { schema: CreateGroceryListSchema } }
		}
	},
	responses: {
		201: {
			content: { 'application/json': { schema: GroceryListSchema } },
			description: 'Grocery list created'
		}
	}
});

export const getGroceryListByIdRoute = createRoute({
	method: 'get',
	path: '/{id}',
	tags: ['Grocery Lists'],
	summary: 'Get Grocery List',
	description: 'Returns list details along with its nested items.',
	request: { params: GroceryListParamSchema },
	responses: {
		200: {
			content: { 'application/json': { schema: GroceryListSchema } },
			description: 'Grocery list retrieved'
		},
		404: {
			content: { 'application/json': { schema: GroceryErrorSchema } },
			description: 'List not found'
		}
	}
});

export const addGroceryItemRoute = createRoute({
	method: 'post',
	path: '/{id}/items',
	tags: ['Grocery Lists'],
	summary: 'Add Item to List',
	description: 'Adds an item to a specific grocery list.',
	request: {
		params: GroceryListParamSchema,
		body: {
			content: { 'application/json': { schema: AddGroceryItemSchema } }
		}
	},
	responses: {
		201: {
			content: { 'application/json': { schema: GroceryItemSchema } },
			description: 'Item added to list'
		},
		404: {
			content: { 'application/json': { schema: GroceryErrorSchema } },
			description: 'List not found'
		}
	}
});

export const updateGroceryItemRoute = createRoute({
	method: 'patch',
	path: '/{id}/items/{itemId}',
	tags: ['Grocery Lists'],
	summary: 'Update Item in List',
	description: 'Updates item details or checks/unchecks it.',
	request: {
		params: GroceryItemParamSchema,
		body: {
			content: { 'application/json': { schema: UpdateGroceryItemSchema } }
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: GroceryItemSchema } },
			description: 'Item updated successfully'
		},
		404: {
			content: { 'application/json': { schema: GroceryErrorSchema } },
			description: 'Item or list not found'
		}
	}
});

export const deleteGroceryItemRoute = createRoute({
	method: 'delete',
	path: '/{id}/items/{itemId}',
	tags: ['Grocery Lists'],
	summary: 'Delete Item from List',
	description: 'Removes an item from a grocery list.',
	request: { params: GroceryItemParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: GroceryActionResponseSchema }
			},
			description: 'Item removed from list'
		},
		404: {
			content: { 'application/json': { schema: GroceryErrorSchema } },
			description: 'Item or list not found'
		}
	}
});
