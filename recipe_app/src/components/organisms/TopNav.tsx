import { useState, useRef, useEffect } from 'react';
import { Plus, ArrowLeft, Settings } from 'lucide-react';
import { useNavigate, useMatch } from 'react-router-dom';

import { Button } from '../atoms/Button';
import { NewRecipeModal } from './NewRecipeModal';
import { useRecipes, RecipeFormData } from '../../context/RecipeContext';
import { usePreferences } from '../../context/PreferencesContext';

export const TopNav = () => {
	const navigate = useNavigate();
	const recipeMatch = useMatch('/recipe/:id');
	const { getRecipe, addRecipe } = useRecipes();
	const { unitSystem, setUnitSystem } = usePreferences();
	const [isNewRecipeOpen, setNewRecipeOpen] = useState(false);
	const [isSettingsOpen, setSettingsOpen] = useState(false);
	const settingsRef = useRef<HTMLDivElement>(null);

	const recipe = recipeMatch ? getRecipe(recipeMatch.params.id!) : undefined;
	const title = recipeMatch ? (recipe?.title ?? 'Recipe') : 'Dashboard';

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				settingsRef.current &&
				!settingsRef.current.contains(e.target as Node)
			) {
				setSettingsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleCreate = (data: RecipeFormData) => {
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
					<div
						ref={settingsRef}
						className='relative'
					>
						<button
							onClick={() => setSettingsOpen((o) => !o)}
							aria-label='Settings'
							className='p-2 -mr-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
						>
							<Settings className='w-5 h-5' />
						</button>

						{isSettingsOpen && (
							<div className='absolute right-0 mt-2 w-56 bg-bg border border-border rounded-lg shadow-lg p-3 z-20'>
								<p className='text-xs font-medium text-text-secondary mb-2'>
									Measurement units
								</p>
								<div className='flex rounded-lg border border-border overflow-hidden text-xs font-medium'>
									<button
										onClick={() => setUnitSystem('metric')}
										className={`flex-1 px-2.5 py-1.5 ${unitSystem === 'metric' ? 'bg-accent text-white' : 'bg-bg text-text-secondary'}`}
									>
										Metric
									</button>
									<button
										onClick={() =>
											setUnitSystem('imperial')
										}
										className={`flex-1 px-2.5 py-1.5 ${unitSystem === 'imperial' ? 'bg-accent text-white' : 'bg-bg text-text-secondary'}`}
									>
										Imperial
									</button>
								</div>
							</div>
						)}
					</div>
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
