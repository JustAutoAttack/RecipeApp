import { useState } from 'react';
import { Plus, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate, useMatch } from 'react-router-dom';

import { Button } from '../atoms/Button';
import { NewRecipeModal } from './NewRecipeModal';
import { useRecipes } from '../../context/RecipeContext';

export const TopNav = () => {
	const navigate = useNavigate();
	const recipeMatch = useMatch('/recipe/:id');
	const { getRecipe, addRecipe } = useRecipes();
	const [isNewRecipeOpen, setNewRecipeOpen] = useState(false);

	const recipe = recipeMatch ? getRecipe(recipeMatch.params.id!) : undefined;
	const title = recipeMatch ? (recipe?.title ?? 'Recipe') : 'Dashboard';

	const handleCreate = (data: {
		title: string;
		cuisine: string[];
		cook_time_minutes: number;
	}) => {
		const created = addRecipe(data);
		setNewRecipeOpen(false);
		navigate(`/recipe/${created.id}`);
	};

	return (
		<>
			<nav className='h-16 flex items-center justify-between px-6 border-b border-border bg-bg shrink-0'>
				<div className='flex-1 flex justify-start'>
					{recipeMatch ? (
						<button
							onClick={() => navigate('/dashboard')}
							aria-label='Back to dashboard'
							className='p-2 -ml-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
						>
							<ArrowLeft className='w-5 h-5' />
						</button>
					) : (
						<Button
							onClick={() => setNewRecipeOpen(true)}
							variant='primary'
						>
							<Plus className='w-5 h-5 mr-2' /> New Recipe
						</Button>
					)}
				</div>

				<h1 className='shrink truncate max-w-[45vw] text-center font-semibold text-text px-4'>
					{title}
				</h1>

				<div className='flex-1 flex justify-end'>
					<button
						onClick={() => console.log('Open settings')}
						aria-label='Settings'
						className='p-2 -mr-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
					>
						<Settings className='w-5 h-5' />
					</button>
				</div>
			</nav>

			<NewRecipeModal
				isOpen={isNewRecipeOpen}
				onClose={() => setNewRecipeOpen(false)}
				onCreate={handleCreate}
			/>
		</>
	);
};
