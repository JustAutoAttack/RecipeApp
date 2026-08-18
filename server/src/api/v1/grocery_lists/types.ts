import { z } from '@hono/zod-openapi';
import {
	AddGroceryItemSchema,
	CreateGroceryListSchema,
	GroceryItemParamSchema,
	GroceryItemSchema,
	GroceryListParamSchema,
	GroceryListSchema,
	UpdateGroceryItemSchema
} from './schemas';

export type GroceryListParam = z.infer<typeof GroceryListParamSchema>;
export type GroceryItemParam = z.infer<typeof GroceryItemParamSchema>;
export type GroceryItem = z.infer<typeof GroceryItemSchema>;
export type GroceryList = z.infer<typeof GroceryListSchema>;
export type CreateGroceryListInput = z.infer<typeof CreateGroceryListSchema>;
export type AddGroceryItemInput = z.infer<typeof AddGroceryItemSchema>;
export type UpdateGroceryItemInput = z.infer<typeof UpdateGroceryItemSchema>;
