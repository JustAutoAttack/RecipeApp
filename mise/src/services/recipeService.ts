import { invoke } from '@tauri-apps/api/core';

export interface RecipeRow {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string; // JSON array string
	cook_time_minutes: number;
	ingredients: string; // JSON array string
	instructions: string; // JSON array string
	description?: string;
	history?: string;
	substitutions?: string;
	allergens?: string; // CSV string
	image_url?: string;
	images?: string; // JSON array string
	created_at: string;
}

export const recipeService = {
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
