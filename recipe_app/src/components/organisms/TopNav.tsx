// src/components/organisms/TopNav.tsx
import { useState } from 'react';
import { Menu, ChefHat, ArrowLeft } from 'lucide-react';
import { useNavigate, useMatch, useLocation } from 'react-router-dom';

import { NavDrawer } from '../molecules/NavDrawer';
import { NewRecipeModal } from '../modals/NewRecipeModal';
import { useRecipes, RecipeFormData } from '../../context/RecipeContext';
import { useCookMode } from '../../context/CookModeContext';

export const TopNav = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const recipeMatch = useMatch('/recipe/:id');
	const { getRecipe, addRecipe } = useRecipes();
	const { startCooking } = useCookMode();

	const [isNewRecipeOpen, setNewRecipeOpen] = useState(false);
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const recipe = recipeMatch ? getRecipe(recipeMatch.params.id!) : undefined;

	const getTitle = () => {
		if (recipeMatch) return recipe?.title ?? 'Recipe';
		if (location.pathname === '/explore') return 'Explore';
		if (location.pathname === '/settings') return 'Settings';
		if (location.pathname === '/account') return 'Account';
		return 'Dashboard';
	};

	const handleCreate = (data: RecipeFormData) => {
		const created = addRecipe(data);
		setNewRecipeOpen(false);
		navigate(`/recipe/${created.id}`);
	};

	return (
		<>
			<nav className='h-16 flex items-center justify-between px-6 border-b border-border bg-bg shrink-0 relative'>
				<div className='flex-1 flex justify-start items-center gap-2'>
					{recipeMatch ? (
						<button
							onClick={() => navigate('/dashboard')}
							aria-label='Back to dashboard'
							className='p-2 -ml-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
						>
							<ArrowLeft className='w-5 h-5' />
						</button>
					) : (
						<button
							onClick={() => setDrawerOpen(true)}
							aria-label='Open menu'
							className='p-2 -ml-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
						>
							<Menu className='w-5 h-5' />
						</button>
					)}
				</div>

				<h1 className='shrink truncate max-w-[45vw] text-center font-semibold text-text px-4'>
					{getTitle()}
				</h1>

				<div className='flex-1 flex justify-end items-center gap-2'>
					{recipeMatch && recipe && (
						<button
							onClick={() => startCooking(recipe)}
							className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-sm'
						>
							<ChefHat className='w-4 h-4' /> Cook
						</button>
					)}
				</div>
			</nav>

			<NavDrawer
				isOpen={isDrawerOpen}
				onClose={() => setDrawerOpen(false)}
				onOpenNewRecipe={() => setNewRecipeOpen(true)}
			/>

			<NewRecipeModal
				isOpen={isNewRecipeOpen}
				onClose={() => setNewRecipeOpen(false)}
				onCreate={handleCreate}
			/>
		</>
	);
};
