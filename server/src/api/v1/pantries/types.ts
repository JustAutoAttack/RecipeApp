import { z } from '@hono/zod-openapi';
import {
	CreatePantryItemSchema,
	PantryItemSchema,
	PantryParamSchema,
	PantryQuerySchema,
	UpdatePantryItemSchema
} from './schemas';

export type PantryParam = z.infer<typeof PantryParamSchema>;
export type PantryQuery = z.infer<typeof PantryQuerySchema>;
export type PantryItem = z.infer<typeof PantryItemSchema>;
export type CreatePantryItemInput = z.infer<typeof CreatePantryItemSchema>;
export type UpdatePantryItemInput = z.infer<typeof UpdatePantryItemSchema>;
