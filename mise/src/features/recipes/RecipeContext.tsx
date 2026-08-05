import { createContext, useContext } from 'react';

import { Recipe, RecipeFormData } from '../types';

export interface RecipeContextType {
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

export const RecipeContext = createContext<RecipeContextType | undefined>(
	undefined
);
