import { Ingredient } from '@core';

export interface IRecipeContext {
	recipes: Recipe[];
	loading: boolean;
	availableCuisines: string[];
	availableAllergens: string[];
	getRecipe: (id: string) => Recipe | undefined;
	addRecipe: (data: RecipeFormData) => Promise<void>;
	updateRecipe: (id: string, data: RecipeFormData) => Promise<void>;
	deleteRecipe: (id: string) => Promise<void>;
	toggleFavorite: (recipeId: string) => Promise<void>;
	refreshRecipes: () => Promise<void>;
}

export interface RecipeRow {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string; // JSON array string from SQLite
	cook_time_minutes: number;
	ingredients: string; // JSON array string
	instructions: string; // JSON array string
	description?: string;
	history?: string;
	substitutions?: string;
	allergens?: string; // JSON array or CSV string
	image_url?: string;
	images?: string; // JSON array string
	created_at: string;
}

export interface Recipe {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string[];
	image_url?: string;
	images?: string[];
	favorite?: boolean;
	cook_time_minutes: number;
	description?: string;
	history?: string;
	substitutions?: string;
	allergens: string[];
	ingredients: Ingredient[];
	instructions: string[];
	created_at: string;
	updated_at?: string;
}

export type RecipeFormData = Omit<
	Recipe,
	'id' | 'owner_id' | 'created_at' | 'updated_at' | 'favorite'
>;
