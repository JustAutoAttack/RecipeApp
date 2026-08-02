// src/components/modals/CookModeOverlay.tsx
import {
	X,
	ChevronLeft,
	ChevronRight,
	Check,
	Play,
	Minus,
	Maximize2,
	ChefHat
} from 'lucide-react';
import { useCookMode } from '../../context/CookModeContext';

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
			<div className='fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-bg border border-border shadow-xl rounded-2xl px-4 py-3 animate-bounce-short'>
				<div className='w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0'>
					<ChefHat className='w-4 h-4' />
				</div>
				<div className='min-w-0 text-left'>
					<p className='text-xs text-text-secondary font-medium'>
						Active Cooking
					</p>
					<p className='text-sm font-semibold truncate max-w-[160px]'>
						{recipe.title}
					</p>
				</div>
				<div className='flex items-center gap-1 ml-2'>
					<button
						onClick={() => setMinimized(false)}
						aria-label='Restore cook mode'
						className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
					>
						<Maximize2 className='w-4 h-4' />
					</button>
					<button
						onClick={closeCooking}
						aria-label='Close cook mode'
						className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-red-600 transition-colors'
					>
						<X className='w-4 h-4' />
					</button>
				</div>
			</div>
		);
	}

	// Full Modal View
	return (
		<div className='fixed inset-0 z-50 flex flex-col bg-bg text-text animate-fade-in'>
			{/* Top Navigation Bar */}
			<div className='flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary shrink-0'>
				<div className='flex items-center gap-3'>
					<span className='px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent uppercase tracking-wider'>
						{stage === 'mise'
							? 'Phase 1: Mise en Place'
							: `Step ${currentStepIndex + 1} of ${totalSteps}`}
					</span>
					<h2 className='font-semibold truncate max-w-md'>
						{recipe.title}
					</h2>
				</div>
				<div className='flex items-center gap-1'>
					<button
						onClick={() => setMinimized(true)}
						aria-label='Minimize cook mode'
						className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
						title='Minimize to floating bar'
					>
						<Minus className='w-5 h-5' />
					</button>
					<button
						onClick={closeCooking}
						aria-label='Exit cook mode'
						className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
					>
						<X className='w-5 h-5' />
					</button>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 overflow-y-auto flex items-center justify-center p-6'>
				<div className='max-w-xl w-full'>
					{stage === 'mise' ? (
						<div className='space-y-6'>
							<div className='text-center space-y-2'>
								<h3 className='text-2xl font-bold'>
									Gather & Prep Ingredients
								</h3>
								<p className='text-sm text-text-secondary'>
									Verify all items are ready before starting
									the stove.
								</p>
							</div>

							<div className='bg-bg-secondary border border-border rounded-xl p-4 space-y-2 max-h-[50vh] overflow-y-auto'>
								{recipe.ingredients.map((ing) => {
									const isChecked =
										!!checkedIngredients[ing.id];
									return (
										<button
											key={ing.id}
											onClick={() =>
												toggleIngredient(ing.id)
											}
											className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
												isChecked
													? 'bg-emerald-50/50 border-emerald-200 text-text-secondary line-through'
													: 'bg-white border-border text-text hover:border-accent'
											}`}
										>
											<span className='text-sm font-medium'>
												{ing.amount}{' '}
												{ing.unit ? ing.unit : ''}{' '}
												{ing.name}
											</span>
											<div
												className={`w-5 h-5 rounded flex items-center justify-center border ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-border'}`}
											>
												{isChecked && (
													<Check className='w-3.5 h-3.5' />
												)}
											</div>
										</button>
									);
								})}
							</div>

							<button
								onClick={() => setStage('cooking')}
								className='w-full py-3 rounded-xl bg-accent text-white font-medium flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-sm'
							>
								<Play className='w-4 h-4 fill-white' /> Start
								Cooking
							</button>
						</div>
					) : (
						<div className='space-y-8 text-center'>
							<div className='min-h-[200px] flex flex-col items-center justify-center p-8 bg-bg-secondary border border-border rounded-2xl shadow-sm'>
								<span className='font-mono text-xs text-accent uppercase tracking-wider mb-3'>
									Step {currentStepIndex + 1} of {totalSteps}
								</span>
								<p className='text-xl md:text-2xl font-medium leading-relaxed'>
									{recipe.instructions[currentStepIndex]}
								</p>
							</div>

							{/* Stepper Navigation */}
							<div className='flex items-center justify-between gap-4'>
								<button
									onClick={() =>
										setStepIndex((prev) =>
											Math.max(0, prev - 1)
										)
									}
									disabled={currentStepIndex === 0}
									className='flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-bg-hover disabled:opacity-30 transition-colors'
								>
									<ChevronLeft className='w-4 h-4' /> Previous
								</button>

								<span className='text-xs text-text-secondary font-mono'>
									{currentStepIndex + 1} / {totalSteps}
								</span>

								<button
									onClick={() =>
										setStepIndex((prev) =>
											Math.min(totalSteps - 1, prev + 1)
										)
									}
									disabled={
										currentStepIndex === totalSteps - 1
									}
									className='flex items-center gap-1 px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:opacity-30 transition-colors shadow-sm'
								>
									Next <ChevronRight className='w-4 h-4' />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
