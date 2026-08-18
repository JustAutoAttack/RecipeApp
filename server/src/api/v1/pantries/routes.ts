import { createRoute } from '@hono/zod-openapi';

import {
	CreatePantryItemSchema,
	PantryActionResponseSchema,
	PantryErrorSchema,
	PantryItemSchema,
	PantryListResponseSchema,
	PantryParamSchema,
	PantryQuerySchema,
	UpdatePantryItemSchema
} from './schemas';

export const listPantryRoute = createRoute({
	method: 'get',
	path: '/',
	tags: ['Pantries'],
	summary: 'List Pantry Items',
	description: 'Retrieve paginated pantry items for the authenticated user.',
	request: { query: PantryQuerySchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: PantryListResponseSchema }
			},
			description: 'Pantry items retrieved successfully'
		}
	}
});

export const createPantryItemRoute = createRoute({
	method: 'post',
	path: '/',
	tags: ['Pantries'],
	summary: 'Add Pantry Item',
	description: 'Adds a new item to the user pantry.',
	request: {
		body: {
			content: { 'application/json': { schema: CreatePantryItemSchema } }
		}
	},
	responses: {
		201: {
			content: { 'application/json': { schema: PantryItemSchema } },
			description: 'Item added successfully'
		}
	}
});

export const updatePantryItemRoute = createRoute({
	method: 'patch',
	path: '/{id}',
	tags: ['Pantries'],
	summary: 'Update Pantry Item',
	description: 'Updates a pantry item.',
	request: {
		params: PantryParamSchema,
		body: {
			content: { 'application/json': { schema: UpdatePantryItemSchema } }
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: PantryItemSchema } },
			description: 'Item updated successfully'
		},
		404: {
			content: { 'application/json': { schema: PantryErrorSchema } },
			description: 'Item not found'
		}
	}
});

export const deletePantryItemRoute = createRoute({
	method: 'delete',
	path: '/{id}',
	tags: ['Pantries'],
	summary: 'Delete Pantry Item',
	description: 'Removes an item from the user pantry.',
	request: { params: PantryParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: PantryActionResponseSchema }
			},
			description: 'Item deleted successfully'
		},
		404: {
			content: { 'application/json': { schema: PantryErrorSchema } },
			description: 'Item not found'
		}
	}
});
