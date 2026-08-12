import { useSafeContext } from '@core';
import { IRecipeContext } from './types';
import { RecipeContext } from './context';

export const useRecipes = (): IRecipeContext =>
	useSafeContext(RecipeContext, 'useRecipes', 'RecipeProvider');
