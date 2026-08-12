import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db, recipes } from '../../../db';
import { createRecipeSchema, updateRecipeSchema } from './schemas';
import { uuidParamSchema } from '../shared';

const route = new Hono();

// Helper to serialize array fields to JSON strings for SQLite and parse them back
const formatRecipe = (recipe: any) => {
	if (!recipe) return null;
	return {
		...recipe,
		cuisine: recipe.cuisine ? JSON.parse(recipe.cuisine) : [],
		ingredients: recipe.ingredients ? JSON.parse(recipe.ingredients) : null,
		instructions: recipe.instructions
			? JSON.parse(recipe.instructions)
			: null,
		substitutions: recipe.substitutions
			? JSON.parse(recipe.substitutions)
			: null,
		allergens: recipe.allergens ? JSON.parse(recipe.allergens) : null,
		image_url: recipe.image_url ? JSON.parse(recipe.image_url) : null
	};
};

// List
route.get('/', async (c) => {
	const allRecipes = await db.select().from(recipes).all();
	const formatted = allRecipes.map(formatRecipe);
	return c.json({ success: true, data: formatted });
});

// Get by ID
route.get('/:id', zValidator('param', uuidParamSchema), async (c) => {
	const { id } = c.req.valid('param');
	const recipe = await db
		.select()
		.from(recipes)
		.where(eq(recipes.id, id))
		.get();

	if (!recipe) {
		return c.json({ success: false, error: 'Recipe not found' }, 404);
	}

	return c.json({ success: true, data: formatRecipe(recipe) });
});

// Create
route.post('/', zValidator('json', createRecipeSchema), async (c) => {
	const body = c.req.valid('json');
	const newId = crypto.randomUUID();
	const now = new Date().toISOString();

	const [created] = await db
		.insert(recipes)
		.values({
			id: newId,
			owner_id: body.owner_id,
			title: body.title,
			cuisine: JSON.stringify(body.cuisine),
			cook_time_minutes: body.cook_time_minutes,
			ingredients: body.ingredients
				? JSON.stringify(body.ingredients)
				: null,
			instructions: body.instructions
				? JSON.stringify(body.instructions)
				: null,
			description: body.description ?? null,
			history: body.history ?? null,
			substitutions: body.substitutions
				? JSON.stringify(body.substitutions)
				: null,
			allergens: body.allergens ? JSON.stringify(body.allergens) : null,
			image_url: body.image_url ? JSON.stringify(body.image_url) : null,
			images: body.images ?? null,
			updated_at: now,
			created_at: now
		})
		.returning();

	return c.json({ success: true, data: formatRecipe(created) }, 201);
});

// Update
route.patch(
	'/:id',
	zValidator('param', uuidParamSchema),
	zValidator('json', updateRecipeSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		const body = c.req.valid('json');
		const now = new Date().toISOString();

		const existing = await db
			.select()
			.from(recipes)
			.where(eq(recipes.id, id))
			.get();

		if (!existing) {
			return c.json({ success: false, error: 'Recipe not found' }, 404);
		}

		const updateValues: Record<string, any> = {
			updated_at: now
		};

		if (body.title !== undefined) updateValues.title = body.title;
		if (body.cuisine !== undefined)
			updateValues.cuisine = JSON.stringify(body.cuisine);
		if (body.cook_time_minutes !== undefined)
			updateValues.cook_time_minutes = body.cook_time_minutes;
		if (body.ingredients !== undefined)
			updateValues.ingredients = JSON.stringify(body.ingredients);
		if (body.instructions !== undefined)
			updateValues.instructions = JSON.stringify(body.instructions);
		if (body.description !== undefined)
			updateValues.description = body.description;
		if (body.history !== undefined) updateValues.history = body.history;
		if (body.substitutions !== undefined)
			updateValues.substitutions = JSON.stringify(body.substitutions);
		if (body.allergens !== undefined)
			updateValues.allergens = JSON.stringify(body.allergens);
		if (body.image_url !== undefined)
			updateValues.image_url = JSON.stringify(body.image_url);
		if (body.images !== undefined) updateValues.images = body.images;

		const [updated] = await db
			.update(recipes)
			.set(updateValues)
			.where(eq(recipes.id, id))
			.returning();

		return c.json({ success: true, data: formatRecipe(updated) });
	}
);

// Delete
route.delete('/:id', zValidator('param', uuidParamSchema), async (c) => {
	const { id } = c.req.valid('param');

	const existing = await db
		.select()
		.from(recipes)
		.where(eq(recipes.id, id))
		.get();

	if (!existing) {
		return c.json({ success: false, error: 'Recipe not found' }, 404);
	}

	await db.delete(recipes).where(eq(recipes.id, id));

	return c.json({ success: true, message: 'Recipe deleted successfully' });
});

export default route;
