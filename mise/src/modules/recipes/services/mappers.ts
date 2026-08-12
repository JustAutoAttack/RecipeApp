import type { RecipeRow, Recipe } from '../types';

export const mapRecipeRowToRecipe = (row: RecipeRow): Recipe => {
	try {
		return {
			id: row.id,
			ownerId: row.owner_id,
			title: row.title,
			cuisine: JSON.parse(row.cuisine || '[]'),
			cookTimeMinutes: row.cook_time_minutes,
			ingredients: JSON.parse(row.ingredients || '[]'),
			instructions: JSON.parse(row.instructions || '[]'),
			description: row.description || undefined,
			history: row.history || undefined,
			substitutions: row.substitutions || undefined,
			allergens: JSON.parse(row.allergens || '[]'),
			imageUrl: row.image_url || undefined,
			images: row.images ? JSON.parse(row.images) : undefined,
			createdAt: row.created_at
		};
	} catch (e) {
		console.error(`Failed to parse recipe row JSON for id: ${row.id}`, e);
		throw e;
	}
};

export const mapRecipeToRow = (recipe: Recipe): RecipeRow => {
	return {
		id: recipe.id,
		owner_id: recipe.ownerId,
		title: recipe.title,
		cuisine: JSON.stringify(recipe.cuisine || []),
		cook_time_minutes: recipe.cookTimeMinutes,
		ingredients: JSON.stringify(recipe.ingredients || []),
		instructions: JSON.stringify(recipe.instructions || []),
		description: recipe.description,
		history: recipe.history,
		substitutions: recipe.substitutions,
		allergens: JSON.stringify(recipe.allergens || []),
		image_url: recipe.imageUrl,
		images: recipe.images ? JSON.stringify(recipe.images) : null,
		created_at: recipe.createdAt
	};
};
