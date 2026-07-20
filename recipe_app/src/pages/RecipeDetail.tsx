import { useParams, Navigate } from 'react-router-dom';

import { useRecipes } from '../context/RecipeContext';
import { RecipeView } from '../components/organisms/RecipeView';

export const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { getRecipe } = useRecipes();
	const recipe = id ? getRecipe(id) : undefined;

	if (!recipe)
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);

	return <RecipeView recipe={recipe} />;
};
