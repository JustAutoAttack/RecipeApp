import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { Ingredient, Recipe, RecipeFormData } from '../../domain/recipe';
import { TauriRecipeService } from '../../services';
import { RecipeRow } from '../../types/storage';
import { useAuth } from '../auth';
import { RecipeContext } from './RecipeContext';

// Helper to safely parse raw SQLite rows into native arrays
export const parseRecipeRow = (row: RecipeRow): Recipe => {
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

	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const refreshRecipes = useCallback(async () => {
		try {
			setLoading(true);
			const data: RecipeRow[] = await TauriRecipeService.getRecipes();
			const scoped: RecipeRow[] = user
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

			await TauriRecipeService.saveRecipe(newRecipe);
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

			await TauriRecipeService.saveRecipe(updatedRecipe);
			await refreshRecipes();
		},
		[recipes, refreshRecipes]
	);

	const deleteRecipe = useCallback(
		async (id: string) => {
			await TauriRecipeService.deleteRecipe(id);
			await refreshRecipes();
		},
		[refreshRecipes]
	);

	const toggleFavorite = useCallback(
		async (recipeId: string) => {
			if (!user) return;
			await TauriRecipeService.toggleFavorite(user.id, recipeId);
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
