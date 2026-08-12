import { ChefHat, Maximize2, X } from 'lucide-react';

interface Props {
	recipeTitle: string;
	onRestore: () => void;
	onClose: () => void;
}

export const MinimizedView = ({ recipeTitle, onRestore, onClose }: Props) => (
	<div className='fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-bg border border-border shadow-xl rounded-2xl px-4 py-3 animate-bounce-short'>
		<div className='w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0'>
			<ChefHat className='w-4 h-4' />
		</div>
		<div className='min-w-0 text-left'>
			<p className='text-xs text-text-secondary font-medium'>
				Active Cooking
			</p>
			<p className='text-sm font-semibold truncate max-w-40 text-text'>
				{recipeTitle}
			</p>
		</div>
		<div className='flex items-center gap-1 ml-2'>
			<button
				onClick={onRestore}
				aria-label='Restore cook mode'
				className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer'
			>
				<Maximize2 className='w-4 h-4' />
			</button>
			<button
				onClick={onClose}
				aria-label='Close cook mode'
				className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-red-600 transition-colors cursor-pointer'
			>
				<X className='w-4 h-4' />
			</button>
		</div>
	</div>
);
