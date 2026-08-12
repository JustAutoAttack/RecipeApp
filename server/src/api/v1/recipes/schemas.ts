import { z } from 'zod';
import { metaSchema } from '../shared';

const baseRecipeSchema = z.object({
	owner_id: z.string().uuid(),
	title: z.string().min(1, 'Title is required'),
	cuisine: z.array(z.string()).min(1, 'Cuisine is required'),
	cook_time_minutes: z.number().positive('Cook time must be positive'),
	ingredients: z.array(z.string()).optional(),
	instructions: z.array(z.string()).optional(),
	description: z.string().optional(),
	history: z.string().optional(),
	substitutions: z.array(z.string()).optional(),
	allergens: z.array(z.string()).optional(),
	image_url: z.array(z.string()).optional(),
	images: z.string().optional()
});

export const createRecipeSchema = baseRecipeSchema;

export const readRecipeSchema = baseRecipeSchema.merge(metaSchema);

export const updateRecipeSchema = baseRecipeSchema
	.omit({ owner_id: true })
	.partial();

