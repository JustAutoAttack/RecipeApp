import { createContext, useContext, useState, ReactNode } from 'react';

import { Recipe } from '../types';

interface CookModeState {
	recipe: Recipe;
	stage: 'mise' | 'cooking';
	checkedIngredients: Record<string, boolean>;
	currentStepIndex: number;
}

interface CookModeContextValue {
	activeSession: CookModeState | null;
	isMinimized: boolean;
	startCooking: (recipe: Recipe) => void;
	closeCooking: () => void;
	setMinimized: (minimized: boolean) => void;
	setStage: (stage: 'mise' | 'cooking') => void;
	toggleIngredient: (id: string) => void;
	setStepIndex: (index: number | ((prev: number) => number)) => void;
}

const CookModeContext = createContext<CookModeContextValue | undefined>(
	undefined
);

export const CookModeProvider = ({ children }: { children: ReactNode }) => {
	const [activeSession, setActiveSession] = useState<CookModeState | null>(
		null
	);
	const [isMinimized, setIsMinimized] = useState(false);

	const startCooking = (recipe: Recipe) => {
		setActiveSession({
			recipe,
			stage: 'mise',
			checkedIngredients: {},
			currentStepIndex: 0
		});
		setIsMinimized(false);
	};

	const closeCooking = () => {
		setActiveSession(null);
		setIsMinimized(false);
	};

	const setMinimized = (minimized: boolean) => setIsMinimized(minimized);

	const setStage = (stage: 'mise' | 'cooking') => {
		setActiveSession((prev) => (prev ? { ...prev, stage } : null));
	};

	const toggleIngredient = (id: string) => {
		setActiveSession((prev) => {
			if (!prev) return null;
			return {
				...prev,
				checkedIngredients: {
					...prev.checkedIngredients,
					[id]: !prev.checkedIngredients[id]
				}
			};
		});
	};

	const setStepIndex = (updater: number | ((prev: number) => number)) => {
		setActiveSession((prev) => {
			if (!prev) return null;
			const nextIndex =
				typeof updater === 'function'
					? updater(prev.currentStepIndex)
					: updater;
			return { ...prev, currentStepIndex: nextIndex };
		});
	};

	return (
		<CookModeContext.Provider
			value={{
				activeSession,
				isMinimized,
				startCooking,
				closeCooking,
				setMinimized,
				setStage,
				toggleIngredient,
				setStepIndex
			}}
		>
			{children}
		</CookModeContext.Provider>
	);
};

export const useCookMode = () => {
	const ctx = useContext(CookModeContext);
	if (!ctx)
		throw new Error('useCookMode must be used within a CookModeProvider');
	return ctx;
};
