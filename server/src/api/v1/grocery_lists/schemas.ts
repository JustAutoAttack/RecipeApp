import { z } from '@hono/zod-openapi';

export const GroceryErrorSchema = z.object({
	error: z.string().openapi({ example: 'Grocery list or item not found' })
});

export const GroceryListParamSchema = z.object({
	id: z
		.string()
		.openapi({ example: 'lst_123456', description: 'Grocery List ID' })
});

export const GroceryItemParamSchema = z.object({
	id: z
		.string()
		.openapi({ example: 'lst_123456', description: 'Grocery List ID' }),
	itemId: z
		.string()
		.openapi({ example: 'itm_987654', description: 'Grocery Item ID' })
});

export const GroceryItemSchema = z.object({
	id: z.string().openapi({ example: 'itm_987654' }),
	listId: z.string().openapi({ example: 'lst_123456' }),
	name: z.string().openapi({ example: 'Olive Oil' }),
	amount: z.number().openapi({ example: 1 }),
	unit: z.string().openapi({ example: 'bottle' }),
	checked: z.boolean().openapi({ example: false }),
	createdAt: z.string().openapi({ example: '2026-08-17T15:00:00.000Z' })
});

export const GroceryListSchema = z.object({
	id: z.string().openapi({ example: 'lst_123456' }),
	userId: z.string().openapi({ example: 'usr_123456' }),
	name: z.string().openapi({ example: 'Weekly Groceries' }),
	items: z.array(GroceryItemSchema),
	updatedAt: z.string().openapi({ example: '2026-08-17T15:00:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-10T12:00:00.000Z' })
});

export const CreateGroceryListSchema = z.object({
	name: z.string().min(1).openapi({ example: 'Weekly Groceries' })
});

export const AddGroceryItemSchema = z.object({
	name: z.string().min(1).openapi({ example: 'Olive Oil' }),
	amount: z.number().positive().openapi({ example: 1 }),
	unit: z.string().min(1).openapi({ example: 'bottle' })
});

export const UpdateGroceryItemSchema = z.object({
	name: z.string().optional(),
	amount: z.number().positive().optional(),
	unit: z.string().optional(),
	checked: z.boolean().optional()
});

export const GroceryActionResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: 'Operation completed successfully' })
});
