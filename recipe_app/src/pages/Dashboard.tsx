import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CollapsibleSection } from '../components/atoms/CollapsibleSection';
import { RecipeGrid } from '../components/organisms/RecipeGrid';
import { RecentsRow } from '../components/organisms/RecentsRow';
import { FilterBar } from '../components/organisms/FilterBar';
import { useRecipes } from '../context/RecipeContext';
import { CuisineMode, Recipe, SortOption } from '../types';

const RECENTS_COUNT = 4;

const sortRecipes = (recipes: Recipe[], sortBy: SortOption): Recipe[] => {
	if (sortBy === 'none') return recipes;
	const arr = [...recipes];
	switch (sortBy) {
		case 'alpha-asc':
			return arr.sort((a, b) => a.title.localeCompare(b.title));
		case 'alpha-desc':
			return arr.sort((a, b) => b.title.localeCompare(a.title));
		case 'duration-asc':
			return arr.sort(
				(a, b) => a.cook_time_minutes - b.cook_time_minutes
			);
		case 'duration-desc':
			return arr.sort(
				(a, b) => b.cook_time_minutes - a.cook_time_minutes
			);
	}
};

export const Dashboard = () => {
	const navigate = useNavigate();
	const { recipes } = useRecipes();
	const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
	const [cuisineMode, setCuisineMode] = useState<CuisineMode>('OR');
	const [sortBy, setSortBy] = useState<SortOption>('none');

	const cuisines = useMemo(
		() => Array.from(new Set(recipes.flatMap((r) => r.cuisine))).sort(),
		[recipes]
	);

	const toggleCuisine = (cuisine: string) =>
		setSelectedCuisines((prev) =>
			prev.includes(cuisine)
				? prev.filter((c) => c !== cuisine)
				: [...prev, cuisine]
		);

	const filtered = useMemo(() => {
		if (selectedCuisines.length === 0) return recipes;
		return recipes.filter((r) =>
			cuisineMode === 'AND'
				? selectedCuisines.every((c) => r.cuisine.includes(c))
				: selectedCuisines.some((c) => r.cuisine.includes(c))
		);
	}, [recipes, selectedCuisines, cuisineMode]);

	const recents = useMemo(
		() =>
			[...filtered]
				.sort((a, b) => b.created_at.localeCompare(a.created_at))
				.slice(0, RECENTS_COUNT),
		[filtered]
	);

	const favorites = useMemo(
		() =>
			sortRecipes(
				filtered.filter((r) => r.favorite),
				sortBy
			),
		[filtered, sortBy]
	);

	const sortedAll = useMemo(
		() => sortRecipes(filtered, sortBy),
		[filtered, sortBy]
	);

	const goToRecipe = (id: string) => navigate(`/recipe/${id}`);

	return (
		<div className='px-6 pt-6'>
			<FilterBar
				cuisines={cuisines}
				selectedCuisines={selectedCuisines}
				cuisineMode={cuisineMode}
				sortBy={sortBy}
				onToggleCuisine={toggleCuisine}
				onCuisineModeChange={setCuisineMode}
				onClearCuisines={() => setSelectedCuisines([])}
				onSortChange={setSortBy}
			/>

			<CollapsibleSection
				title='Recents'
				count={recents.length}
			>
				{recents.length > 0 ? (
					<RecentsRow
						recipes={recents}
						onRecipeClick={goToRecipe}
					/>
				) : (
					<p className='text-sm text-text-secondary'>
						No recent recipes.
					</p>
				)}
			</CollapsibleSection>

			<CollapsibleSection
				title='Favorites'
				count={favorites.length}
			>
				{favorites.length > 0 ? (
					<RecipeGrid
						recipes={favorites}
						onRecipeClick={goToRecipe}
					/>
				) : (
					<p className='text-sm text-text-secondary'>
						No favorites yet.
					</p>
				)}
			</CollapsibleSection>

			<CollapsibleSection
				title='All Recipes'
				count={sortedAll.length}
			>
				<RecipeGrid
					recipes={sortedAll}
					onRecipeClick={goToRecipe}
				/>
			</CollapsibleSection>
		</div>
	);
};
