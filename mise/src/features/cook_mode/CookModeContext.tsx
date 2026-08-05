import { createContext } from 'react';

import { Recipe } from '../../domain/recipe';
import { CookModeState } from './types';

export interface ICookModeContext {
	activeSession: CookModeState | null;
	isMinimized: boolean;
	startCooking: (recipe: Recipe) => void;
	closeCooking: () => void;
	setMinimized: (minimized: boolean) => void;
	setStage: (stage: 'mise' | 'cooking') => void;
	toggleIngredient: (id: string) => void;
	setStepIndex: (index: number | ((prev: number) => number)) => void;
}

export const CookModeContext = createContext<ICookModeContext | undefined>(
	undefined
);
