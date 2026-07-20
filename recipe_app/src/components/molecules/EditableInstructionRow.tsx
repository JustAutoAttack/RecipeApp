import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
	index: number;
	step: string;
	isFirst: boolean;
	isLast: boolean;
	onChange: (step: string) => void;
	onRemove: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
}

export const EditableInstructionRow = ({
	index,
	step,
	isFirst,
	isLast,
	onChange,
	onRemove,
	onMoveUp,
	onMoveDown
}: Props) => (
	<div className='flex gap-2 items-start py-1'>
		<span className='font-mono text-sm text-text-secondary shrink-0 pt-2 w-5'>
			{index + 1}.
		</span>
		<textarea
			value={step}
			onChange={(e) => onChange(e.target.value)}
			rows={2}
			className='flex-1 p-1.5 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
		/>
		<div className='flex flex-col shrink-0'>
			<button
				type='button'
				onClick={onMoveUp}
				disabled={isFirst}
				aria-label='Move step up'
				className='p-0.5 rounded text-text-secondary hover:bg-bg-hover disabled:opacity-30'
			>
				<ChevronUp className='w-3.5 h-3.5' />
			</button>
			<button
				type='button'
				onClick={onMoveDown}
				disabled={isLast}
				aria-label='Move step down'
				className='p-0.5 rounded text-text-secondary hover:bg-bg-hover disabled:opacity-30'
			>
				<ChevronDown className='w-3.5 h-3.5' />
			</button>
		</div>
		<button
			type='button'
			onClick={onRemove}
			aria-label='Remove step'
			className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover shrink-0'
		>
			<X className='w-4 h-4' />
		</button>
	</div>
);
