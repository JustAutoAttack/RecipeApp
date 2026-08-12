import { Recipe } from '@recipes';

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

export interface CookModeState {
	recipe: Recipe;
	stage: 'mise' | 'cooking';
	checkedIngredients: Record<string, boolean>;
	currentStepIndex: number;
}
