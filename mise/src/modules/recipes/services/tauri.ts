import { safeInvoke } from '@core/utils/tauri';
import { RecipeRow } from '../types';

export const TauriRecipeService = {
	async getRecipes(): Promise<RecipeRow[]> {
		return safeInvoke<RecipeRow[]>('get_recipes');
	},

	async saveRecipe(recipe: RecipeRow): Promise<void> {
		return safeInvoke<void>('save_recipe', { recipe });
	},

	async deleteRecipe(id: string): Promise<void> {
		return safeInvoke<void>('delete_recipe', { id });
	},

	async toggleFavorite(userId: string, recipeId: string): Promise<boolean> {
		return safeInvoke<boolean>('toggle_favorite', { userId, recipeId });
	}
};
