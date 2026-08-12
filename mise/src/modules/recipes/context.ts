import { createContext } from 'react';

import { IRecipeContext } from './types';

export const RecipeContext = createContext<IRecipeContext | undefined>(
	undefined
);
