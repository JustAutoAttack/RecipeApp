import { z } from '@hono/zod-openapi';

export const PantryErrorSchema = z.object({
	error: z.string().openapi({ example: 'Pantry item not found' })
});

export const PantryParamSchema = z.object({
	id: z
		.string()
		.openapi({ example: 'pnt_123456', description: 'Pantry Item ID' })
});

export const PantryQuerySchema = z.object({
	search: z.string().optional().openapi({ example: 'Milk' }),
	limit: z.coerce
		.number()
		.min(1)
		.max(100)
		.default(50)
		.openapi({ example: 50 }),
	offset: z.coerce.number().min(0).default(0).openapi({ example: 0 })
});

export const PantryItemSchema = z.object({
	id: z.string().openapi({ example: 'pnt_123456' }),
	userId: z.string().openapi({ example: 'usr_123456' }),
	name: z.string().openapi({ example: 'Whole Milk' }),
	amount: z.number().openapi({ example: 1 }),
	unit: z.string().openapi({ example: 'gallon' }),
	expiresAt: z
		.string()
		.nullable()
		.openapi({ example: '2026-08-25T00:00:00.000Z' }),
	updatedAt: z.string().openapi({ example: '2026-08-17T15:00:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-10T12:00:00.000Z' })
});

export const CreatePantryItemSchema = z.object({
	name: z.string().min(1).openapi({ example: 'Whole Milk' }),
	amount: z.number().positive().openapi({ example: 1 }),
	unit: z.string().min(1).openapi({ example: 'gallon' }),
	expiresAt: z
		.string()
		.datetime()
		.optional()
		.openapi({ example: '2026-08-25T00:00:00.000Z' })
});

export const UpdatePantryItemSchema = CreatePantryItemSchema.partial();

export const PantryListResponseSchema = z.object({
	data: z.array(PantryItemSchema),
	total: z.number().openapi({ example: 12 }),
	limit: z.number().openapi({ example: 50 }),
	offset: z.number().openapi({ example: 0 })
});

export const PantryActionResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: 'Item removed successfully' })
});
