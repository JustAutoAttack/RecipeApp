import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { RecipeView, useRecipes } from '@recipes';

export const RecipeDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { getRecipe, updateRecipe, deleteRecipe, toggleFavorite } =
		useRecipes();
	const recipe = id ? getRecipe(id) : undefined;

	if (!recipe)
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);

	const handleDelete = (recipeId: string) => {
		deleteRecipe(recipeId);
		navigate('/dashboard');
	};

	return (
		<RecipeView
			recipe={recipe}
			onUpdate={updateRecipe}
			onDelete={handleDelete}
			onToggleFavorite={toggleFavorite}
		/>
	);
};
