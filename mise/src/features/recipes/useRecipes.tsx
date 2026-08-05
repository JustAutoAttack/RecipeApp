import { useContext } from 'react';

import { RecipeContext } from './RecipeContext';

export const useRecipes = () => {
	const ctx = useContext(RecipeContext);
	if (!ctx)
		throw new Error('useRecipes must be used within a RecipeProvider');
	return ctx;
};
