import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode
} from 'react';

import { Recipe } from '../types';
import { mockRecipes } from '../data/mockRecipes';

interface NewRecipeInput {
	title: string;
	cuisine: string[];
	cook_time_minutes: number;
}

interface RecipeContextValue {
	recipes: Recipe[];
	getRecipe: (id: string) => Recipe | undefined;
	addRecipe: (data: NewRecipeInput) => Recipe;
	toggleFavorite: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

let nextId = mockRecipes.length + 1;

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
	const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

	const getRecipe = useCallback(
		(id: string) => recipes.find((r) => r.id === id),
		[recipes]
	);

	const addRecipe = useCallback((data: NewRecipeInput) => {
		const now = new Date().toISOString();
		const recipe: Recipe = {
			id: String(nextId++),
			title: data.title,
			cuisine: data.cuisine,
			favorite: false,
			cook_time_minutes: data.cook_time_minutes,
			ingredients: [],
			instructions: [],
			created_at: now,
			updated_at: now
		};
		setRecipes((prev) => [recipe, ...prev]);
		return recipe;
	}, []);

	const toggleFavorite = useCallback((id: string) => {
		setRecipes((prev) =>
			prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
		);
	}, []);

	return (
		<RecipeContext.Provider
			value={{ recipes, getRecipe, addRecipe, toggleFavorite }}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export const useRecipes = () => {
	const ctx = useContext(RecipeContext);
	if (!ctx)
		throw new Error('useRecipes must be used within a RecipeProvider');
	return ctx;
};
