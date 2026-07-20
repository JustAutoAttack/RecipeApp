import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode
} from 'react';

import { Ingredient, Recipe } from '../types';
import { mockRecipes } from '../data/mockRecipes';

export interface RecipeFormData {
	title: string;
	cuisine: string[];
	cook_time_minutes: number;
	ingredients: Ingredient[];
	instructions: string[];
	description: string;
	history: string;
	substitutions: string;
	allergens: string[];
	image_url: string;
	images: string[];
}

interface RecipeContextValue {
	recipes: Recipe[];
	getRecipe: (id: string) => Recipe | undefined;
	addRecipe: (data: RecipeFormData) => Recipe;
	updateRecipe: (id: string, data: RecipeFormData) => void;
	deleteRecipe: (id: string) => void;
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

	const addRecipe = useCallback((data: RecipeFormData) => {
		const now = new Date().toISOString();
		const recipe: Recipe = {
			id: String(nextId++),
			favorite: false,
			...data,
			created_at: now,
			updated_at: now
		};
		setRecipes((prev) => [recipe, ...prev]);
		return recipe;
	}, []);

	const updateRecipe = useCallback((id: string, data: RecipeFormData) => {
		setRecipes((prev) =>
			prev.map((r) =>
				r.id === id
					? { ...r, ...data, updated_at: new Date().toISOString() }
					: r
			)
		);
	}, []);

	const deleteRecipe = useCallback((id: string) => {
		setRecipes((prev) => prev.filter((r) => r.id !== id));
	}, []);

	const toggleFavorite = useCallback((id: string) => {
		setRecipes((prev) =>
			prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
		);
	}, []);

	return (
		<RecipeContext.Provider
			value={{
				recipes,
				getRecipe,
				addRecipe,
				updateRecipe,
				deleteRecipe,
				toggleFavorite
			}}
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
