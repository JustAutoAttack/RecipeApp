import { Minus, X } from 'lucide-react';

interface Props {
	stage: 'mise' | 'cooking';
	currentStepIndex: number;
	totalSteps: number;
	recipeTitle: string;
	onMinimize: () => void;
	onClose: () => void;
}

export const CookModeHeader = ({
	stage,
	currentStepIndex,
	totalSteps,
	recipeTitle,
	onMinimize,
	onClose
}: Props) => (
	<div className='flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary shrink-0'>
		<div className='flex items-center gap-3'>
			<span className='px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent uppercase tracking-wider'>
				{stage === 'mise'
					? 'Phase 1: Mise en Place'
					: `Step ${currentStepIndex + 1} of ${totalSteps}`}
			</span>
			<h2 className='font-semibold truncate max-w-md text-text'>
				{recipeTitle}
			</h2>
		</div>
		<div className='flex items-center gap-1'>
			<button
				onClick={onMinimize}
				aria-label='Minimize cook mode'
				className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer'
				title='Minimize to floating bar'
			>
				<Minus className='w-5 h-5' />
			</button>
			<button
				onClick={onClose}
				aria-label='Exit cook mode'
				className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer'
			>
				<X className='w-5 h-5' />
			</button>
		</div>
	</div>
);
