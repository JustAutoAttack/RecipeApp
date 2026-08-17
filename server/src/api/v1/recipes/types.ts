import { z } from '@hono/zod-openapi';

import {
	CreateRecipeSchema,
	IngredientModelSchema,
	InstructionStepModelSchema,
	RecipeParamSchema,
	RecipeQuerySchema,
	RecipeSchema,
	SubstitutionModelSchema,
	UpdateRecipeSchema
} from './schemas';

export type IngredientModel = z.infer<typeof IngredientModelSchema>;
export type InstructionStepModel = z.infer<typeof InstructionStepModelSchema>;
export type SubstitutionModel = z.infer<typeof SubstitutionModelSchema>;

export type RecipeParam = z.infer<typeof RecipeParamSchema>;
export type RecipeQuery = z.infer<typeof RecipeQuerySchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type CreateRecipeInput = z.infer<typeof CreateRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof UpdateRecipeSchema>;
