import { useCookMode } from '../../useCookMode';
import {
	CookingStepView,
	CookModeHeader,
	MinimizedView,
	MiseEnPlaceView
} from '../atoms';

export const CookModeOverlay = () => {
	const {
		activeSession,
		isMinimized,
		closeCooking,
		setMinimized,
		setStage,
		toggleIngredient,
		setStepIndex
	} = useCookMode();

	if (!activeSession) return null;

	const { recipe, stage, checkedIngredients, currentStepIndex } =
		activeSession;
	const totalSteps = recipe.instructions.length;

	// Minimized Floating Pill View
	if (isMinimized) {
		return (
			<MinimizedView
				recipeTitle={recipe.title}
				onRestore={() => setMinimized(false)}
				onClose={closeCooking}
			/>
		);
	}

	// Full Modal View
	return (
		<div className='fixed inset-0 z-50 flex flex-col bg-bg text-text animate-fade-in'>
			<CookModeHeader
				stage={stage}
				currentStepIndex={currentStepIndex}
				totalSteps={totalSteps}
				recipeTitle={recipe.title}
				onMinimize={() => setMinimized(true)}
				onClose={closeCooking}
			/>

			<div className='flex-1 overflow-y-auto flex items-center justify-center p-6'>
				<div className='max-w-xl w-full'>
					{stage === 'mise' ? (
						<MiseEnPlaceView
							recipe={recipe}
							checkedIngredients={checkedIngredients}
							toggleIngredient={toggleIngredient}
							onStartCooking={() => setStage('cooking')}
						/>
					) : (
						<CookingStepView
							instruction={recipe.instructions[currentStepIndex]}
							currentStepIndex={currentStepIndex}
							totalSteps={totalSteps}
							onPrevious={() =>
								setStepIndex((prev) => Math.max(0, prev - 1))
							}
							onNext={() =>
								setStepIndex((prev) =>
									Math.min(totalSteps - 1, prev + 1)
								)
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
