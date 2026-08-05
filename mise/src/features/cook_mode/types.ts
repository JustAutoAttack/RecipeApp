import { Recipe } from '../../domain/recipe';

export interface CookModeState {
	recipe: Recipe;
	stage: 'mise' | 'cooking';
	checkedIngredients: Record<string, boolean>;
	currentStepIndex: number;
}
