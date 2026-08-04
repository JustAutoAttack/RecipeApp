import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	ReactNode,
	useMemo
} from 'react';

import { recipeService, RecipeRow } from '../services/recipeService';
import { useAuth } from './AuthContext';
import { Ingredient } from '../types';

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

// Parsed UI-friendly Recipe shape
export interface ParsedRecipe {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string[];
	cook_time_minutes: number;
	ingredients: Ingredient[];
	instructions: string[];
	description?: string;
	history?: string;
	substitutions?: string;
	allergens: string[];
	image_url?: string;
	images: string[];
	created_at: string;
	favorite?: boolean;
}

interface RecipeContextValue {
	recipes: ParsedRecipe[];
	loading: boolean;
	availableCuisines: string[];
	availableAllergens: string[];
	getRecipe: (id: string) => ParsedRecipe | undefined;
	addRecipe: (data: RecipeFormData) => Promise<void>;
	updateRecipe: (id: string, data: RecipeFormData) => Promise<void>;
	deleteRecipe: (id: string) => Promise<void>;
	toggleFavorite: (recipeId: string) => Promise<void>;
	refreshRecipes: () => Promise<void>;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

// Helper to safely parse raw SQLite rows into native arrays
export const parseRecipeRow = (row: RecipeRow): ParsedRecipe => {
	let cuisine: string[] = [];
	try {
		cuisine =
			typeof row.cuisine === 'string'
				? JSON.parse(row.cuisine)
				: row.cuisine || [];
	} catch {
		cuisine = [];
	}

	let ingredients: Ingredient[] = [];
	try {
		ingredients =
			typeof row.ingredients === 'string'
				? JSON.parse(row.ingredients)
				: row.ingredients || [];
	} catch {
		ingredients = [];
	}

	let instructions: string[] = [];
	try {
		instructions =
			typeof row.instructions === 'string'
				? JSON.parse(row.instructions)
				: row.instructions || [];
	} catch {
		instructions = [];
	}

	let images: string[] = [];
	try {
		images =
			typeof row.images === 'string'
				? JSON.parse(row.images)
				: row.images || [];
	} catch {
		images = [];
	}

	let allergens: string[] = [];
	if (typeof row.allergens === 'string') {
		allergens = row.allergens.includes('[')
			? JSON.parse(row.allergens)
			: row.allergens
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean);
	} else if (Array.isArray(row.allergens)) {
		allergens = row.allergens;
	}

	return {
		...row,
		cuisine,
		ingredients,
		instructions,
		images,
		allergens
	};
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const [recipes, setRecipes] = useState<ParsedRecipe[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const refreshRecipes = useCallback(async () => {
		try {
			setLoading(true);
			const data = await recipeService.getRecipes();
			const scoped = user
				? data.filter((r) => r.owner_id === user.id)
				: [];
			setRecipes(scoped.map(parseRecipeRow));
		} catch (err) {
			console.error('Failed to load live recipes from SQLite:', err);
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		refreshRecipes();
	}, [refreshRecipes]);

	// Dynamically compile unique set of cuisines and allergens used across all user recipes for autocomplete
	const availableCuisines = useMemo(() => {
		const set = new Set<string>();
		recipes.forEach((r) => r.cuisine.forEach((c) => set.add(c)));
		return Array.from(set).sort();
	}, [recipes]);

	const availableAllergens = useMemo(() => {
		const set = new Set<string>();
		recipes.forEach((r) => r.allergens.forEach((a) => set.add(a)));
		return Array.from(set).sort();
	}, [recipes]);

	const getRecipe = useCallback(
		(id: string) => recipes.find((r) => r.id === id),
		[recipes]
	);

	const addRecipe = useCallback(
		async (data: RecipeFormData) => {
			if (!user)
				throw new Error(
					'Cannot add recipe without an active user session.'
				);

			const now = new Date().toISOString();
			const newRecipe: RecipeRow = {
				id: crypto.randomUUID(),
				owner_id: user.id,
				title: data.title,
				cuisine: JSON.stringify(data.cuisine),
				cook_time_minutes: data.cook_time_minutes,
				ingredients: JSON.stringify(data.ingredients),
				instructions: JSON.stringify(data.instructions),
				description: data.description || undefined,
				history: data.history || undefined,
				substitutions: data.substitutions || undefined,
				allergens:
					data.allergens.length > 0
						? JSON.stringify(data.allergens)
						: undefined,
				image_url: data.image_url || undefined,
				images:
					data.images.length > 0
						? JSON.stringify(data.images)
						: undefined,
				created_at: now
			};

			await recipeService.saveRecipe(newRecipe);
			await refreshRecipes();
		},
		[user, refreshRecipes]
	);

	const updateRecipe = useCallback(
		async (id: string, data: RecipeFormData) => {
			const existing = recipes.find((r) => r.id === id);
			if (!existing) return;

			const updatedRecipe: RecipeRow = {
				id: existing.id,
				owner_id: existing.owner_id,
				title: data.title,
				cuisine: JSON.stringify(data.cuisine),
				cook_time_minutes: data.cook_time_minutes,
				ingredients: JSON.stringify(data.ingredients),
				instructions: JSON.stringify(data.instructions),
				description: data.description || undefined,
				history: data.history || undefined,
				substitutions: data.substitutions || undefined,
				allergens:
					data.allergens.length > 0
						? JSON.stringify(data.allergens)
						: undefined,
				image_url: data.image_url || undefined,
				images:
					data.images.length > 0
						? JSON.stringify(data.images)
						: undefined,
				created_at: existing.created_at
			};

			await recipeService.saveRecipe(updatedRecipe);
			await refreshRecipes();
		},
		[recipes, refreshRecipes]
	);

	const deleteRecipe = useCallback(
		async (id: string) => {
			await recipeService.deleteRecipe(id);
			await refreshRecipes();
		},
		[refreshRecipes]
	);

	const toggleFavorite = useCallback(
		async (recipeId: string) => {
			if (!user) return;
			await recipeService.toggleFavorite(user.id, recipeId);
			await refreshRecipes();
		},
		[user, refreshRecipes]
	);

	return (
		<RecipeContext.Provider
			value={{
				recipes,
				loading,
				availableCuisines,
				availableAllergens,
				getRecipe,
				addRecipe,
				updateRecipe,
				deleteRecipe,
				toggleFavorite,
				refreshRecipes
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
