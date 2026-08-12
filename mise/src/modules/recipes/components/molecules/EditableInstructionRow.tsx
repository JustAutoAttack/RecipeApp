import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface EditableInstructionRowProps {
	index: number;
	step: string;
	isFirst: boolean;
	isLast: boolean;
	onChange: (step: string) => void;
	onRemove: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
}

// --- Subcomponents ---

const StepNumber = ({ index }: { index: number }) => (
	<span className='font-mono text-sm text-text-secondary shrink-0 pt-2 w-5'>
		{index + 1}.
	</span>
);

const StepInput = ({
	value,
	onChange
}: {
	value: string;
	onChange: (val: string) => void;
}) => (
	<textarea
		value={value}
		onChange={(e) => onChange(e.target.value)}
		rows={2}
		className='flex-1 p-1.5 text-sm border border-border rounded-lg bg-bg text-text outline-none focus:ring-2 focus:ring-accent resize-none transition-colors'
	/>
);

const StepReorderControls = ({
	isFirst,
	isLast,
	onMoveUp,
	onMoveDown
}: {
	isFirst: boolean;
	isLast: boolean;
	onMoveUp: () => void;
	onMoveDown: () => void;
}) => (
	<div className='flex flex-col shrink-0'>
		<button
			type='button'
			onClick={onMoveUp}
			disabled={isFirst}
			aria-label='Move step up'
			className='p-0.5 rounded text-text-secondary hover:bg-bg-hover disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed'
		>
			<ChevronUp className='w-3.5 h-3.5' />
		</button>
		<button
			type='button'
			onClick={onMoveDown}
			disabled={isLast}
			aria-label='Move step down'
			className='p-0.5 rounded text-text-secondary hover:bg-bg-hover disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed'
		>
			<ChevronDown className='w-3.5 h-3.5' />
		</button>
	</div>
);

const RemoveStepButton = ({ onRemove }: { onRemove: () => void }) => (
	<button
		type='button'
		onClick={onRemove}
		aria-label='Remove step'
		className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-red-500 transition-colors shrink-0 cursor-pointer'
	>
		<X className='w-4 h-4' />
	</button>
);

// --- Main Container Component ---

export const EditableInstructionRow = ({
	index,
	step,
	isFirst,
	isLast,
	onChange,
	onRemove,
	onMoveUp,
	onMoveDown
}: EditableInstructionRowProps) => (
	<div className='flex gap-2 items-start py-1'>
		<StepNumber index={index} />
		<StepInput
			value={step}
			onChange={onChange}
		/>
		<StepReorderControls
			isFirst={isFirst}
			isLast={isLast}
			onMoveUp={onMoveUp}
			onMoveDown={onMoveDown}
		/>
		<RemoveStepButton onRemove={onRemove} />
	</div>
);
