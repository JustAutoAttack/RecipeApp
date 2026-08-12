import z from 'zod';
import {
	readRecipeSchema,
	createRecipeSchema,
	updateRecipeSchema
} from './schemas';

export type CreateRecipeDTO = z.infer<typeof createRecipeSchema>;
export type ReadRecipeDTO = z.infer<typeof readRecipeSchema>;
export type UpdateRecipeDTO = z.infer<typeof updateRecipeSchema>;
