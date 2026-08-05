import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
	instruction: string;
	currentStepIndex: number;
	totalSteps: number;
	onPrevious: () => void;
	onNext: () => void;
}

export const CookingStepView = ({
	instruction,
	currentStepIndex,
	totalSteps,
	onPrevious,
	onNext
}: Props) => (
	<div className='space-y-8 text-center'>
		<div className='min-h-50 flex flex-col items-center justify-center p-8 bg-bg-secondary border border-border rounded-2xl shadow-sm'>
			<span className='font-mono text-xs text-accent uppercase tracking-wider mb-3'>
				Step {currentStepIndex + 1} of {totalSteps}
			</span>
			<p className='text-xl md:text-2xl font-medium leading-relaxed text-text'>
				{instruction}
			</p>
		</div>

		{/* Stepper Navigation */}
		<div className='flex items-center justify-between gap-4'>
			<button
				type='button'
				onClick={onPrevious}
				disabled={currentStepIndex === 0}
				className='flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-bg-hover disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed text-text'
			>
				<ChevronLeft className='w-4 h-4' /> Previous
			</button>

			<span className='text-xs text-text-secondary font-mono'>
				{currentStepIndex + 1} / {totalSteps}
			</span>

			<button
				type='button'
				onClick={onNext}
				disabled={currentStepIndex === totalSteps - 1}
				className='flex items-center gap-1 px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:opacity-30 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed'
			>
				Next <ChevronRight className='w-4 h-4' />
			</button>
		</div>
	</div>
);
