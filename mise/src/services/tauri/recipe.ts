import { invoke } from '@tauri-apps/api/core';
import { RecipeRow } from '../../types/storage';

export const TauriRecipeService = {
	async getRecipes(): Promise<RecipeRow[]> {
		return invoke<RecipeRow[]>('get_recipes');
	},

	async saveRecipe(recipe: RecipeRow): Promise<void> {
		return invoke<void>('save_recipe', { recipe });
	},

	async deleteRecipe(id: string): Promise<void> {
		return invoke<void>('delete_recipe', { id });
	},

	async toggleFavorite(userId: string, recipeId: string): Promise<boolean> {
		return invoke<boolean>('toggle_favorite', { userId, recipeId });
	}
};
