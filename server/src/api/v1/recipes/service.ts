import {
	CreateRecipeInput,
	Recipe,
	RecipeQuery,
	UpdateRecipeInput
} from './types';

export class RecipesService {
	async listRecipes(
		query: RecipeQuery
	): Promise<{ data: Recipe[]; total: number }> {
		// TODO: Query `full_recipe_view` with pagination (limit, offset) & optional cuisine/search filters
		return {
			data: [],
			total: 0
		};
	}

	async getRecipeById(id: string): Promise<Recipe | null> {
		// TODO: Query `full_recipe_view` where id = id
		return null;
	}

	async createRecipe(
		ownerId: string,
		input: CreateRecipeInput
	): Promise<Recipe> {
		// TODO: Serialize ingredients/instructions/substitutions/allergens/images to JSON strings for SQLite table `recipes`
		const now = new Date().toISOString();
		return {
			id: 'rcp_' + Date.now(),
			ownerId,
			title: input.title,
			cuisine: input.cuisine,
			cookTimeMinutes: input.cookTimeMinutes,
			ingredients: input.ingredients,
			instructions: input.instructions,
			description: input.description ?? null,
			history: input.history ?? null,
			substitutions: input.substitutions ?? null,
			allergens: input.allergens ?? null,
			imageUrl: input.imageUrl ?? null,
			images: input.images ?? null,
			likesCount: 0,
			favoritesCount: 0,
			updatedAt: now,
			createdAt: now
		};
	}

	async updateRecipe(
		id: string,
		ownerId: string,
		input: UpdateRecipeInput
	): Promise<Recipe | null> {
		// TODO: Check ownership & UPDATE `recipes` table
		return null;
	}

	async deleteRecipe(id: string, ownerId: string): Promise<boolean> {
		// TODO: Check ownership & DELETE FROM `recipes` WHERE id = id AND owner_id = ownerId
		return true;
	}

	async likeRecipe(userId: string, recipeId: string): Promise<void> {
		// TODO: INSERT INTO `liked_recipes` (user_id, recipe_id, created_at)
	}

	async unlikeRecipe(userId: string, recipeId: string): Promise<void> {
		// TODO: DELETE FROM `liked_recipes` WHERE user_id = userId AND recipe_id = recipeId
	}

	async favoriteRecipe(userId: string, recipeId: string): Promise<void> {
		// TODO: INSERT INTO `favorited_recipes` (user_id, recipe_id, created_at)
	}

	async unfavoriteRecipe(userId: string, recipeId: string): Promise<void> {
		// TODO: DELETE FROM `favorited_recipes` WHERE user_id = userId AND recipe_id = recipeId
	}
}

export const recipesService = new RecipesService();
