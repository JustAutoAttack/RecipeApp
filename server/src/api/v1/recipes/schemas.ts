import { z } from '@hono/zod-openapi';

export const RecipeErrorSchema = z.object({
	error: z.string().openapi({ example: 'Recipe not found' })
});

export const RecipeParamSchema = z.object({
	id: z.string().openapi({ example: 'rcp_987654', description: 'Recipe ID' })
});

export const RecipeQuerySchema = z.object({
	cuisine: z.string().optional().openapi({ example: 'Italian' }),
	search: z.string().optional().openapi({ example: 'Pasta' }),
	limit: z.coerce
		.number()
		.min(1)
		.max(100)
		.default(20)
		.openapi({ example: 20 }),
	offset: z.coerce.number().min(0).default(0).openapi({ example: 0 })
});

export const IngredientModelSchema = z.object({
	name: z.string().openapi({ example: 'Garlic' }),
	amount: z.number().openapi({ example: 3 }),
	unit: z.string().openapi({ example: 'cloves' })
});

export const InstructionStepModelSchema = z.object({
	stepNumber: z.number().openapi({ example: 1 }),
	text: z
		.string()
		.openapi({ example: 'Mince the garlic finely and sauté in olive oil.' })
});

export const SubstitutionModelSchema = z.object({
	original: z.string().openapi({ example: 'Heavy Cream' }),
	substitute: z.string().openapi({ example: 'Coconut Milk' }),
	note: z
		.string()
		.optional()
		.openapi({ example: 'Will add a slight coconut flavor' })
});

export const RecipeSchema = z.object({
	id: z.string().openapi({ example: 'rcp_987654' }),
	ownerId: z.string().openapi({ example: 'usr_123456' }),
	title: z.string().openapi({ example: 'Creamy Garlic Penne' }),
	cuisine: z.string().openapi({ example: 'Italian' }),
	cookTimeMinutes: z.number().openapi({ example: 25 }),
	ingredients: z.array(IngredientModelSchema),
	instructions: z.array(InstructionStepModelSchema),
	description: z
		.string()
		.nullable()
		.openapi({ example: 'A quick and rich weeknight pasta.' }),
	history: z
		.string()
		.nullable()
		.openapi({ example: 'Passed down from family in Tuscany.' }),
	substitutions: z.array(SubstitutionModelSchema).nullable(),
	allergens: z
		.array(z.string())
		.nullable()
		.openapi({ example: ['dairy', 'gluten'] }),
	imageUrl: z
		.string()
		.nullable()
		.openapi({ example: 'https://cdn.example.com/recipes/penne.jpg' }),
	images: z
		.array(z.string())
		.nullable()
		.openapi({ example: ['https://cdn.example.com/recipes/penne-1.jpg'] }),
	likesCount: z.number().openapi({ example: 42 }),
	favoritesCount: z.number().openapi({ example: 18 }),
	updatedAt: z.string().openapi({ example: '2026-08-17T15:00:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-10T12:00:00.000Z' })
});

export const CreateRecipeSchema = z.object({
	title: z.string().min(1).openapi({ example: 'Creamy Garlic Penne' }),
	cuisine: z.string().min(1).openapi({ example: 'Italian' }),
	cookTimeMinutes: z.number().positive().openapi({ example: 25 }),
	ingredients: z.array(IngredientModelSchema).min(1),
	instructions: z.array(InstructionStepModelSchema).min(1),
	description: z
		.string()
		.optional()
		.openapi({ example: 'A quick and rich weeknight pasta.' }),
	history: z.string().optional(),
	substitutions: z.array(SubstitutionModelSchema).optional(),
	allergens: z
		.array(z.string())
		.optional()
		.openapi({ example: ['dairy', 'gluten'] }),
	imageUrl: z.string().url().optional(),
	images: z.array(z.string().url()).optional()
});

export const UpdateRecipeSchema = CreateRecipeSchema.partial();

export const RecipeListResponseSchema = z.object({
	data: z.array(RecipeSchema),
	total: z.number().openapi({ example: 100 }),
	limit: z.number().openapi({ example: 20 }),
	offset: z.number().openapi({ example: 0 })
});

export const RecipeActionResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: 'Action completed successfully' })
});
