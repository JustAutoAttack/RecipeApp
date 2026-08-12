import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

import { getUnitDef, Ingredient, UnitValue } from '@core';

interface EditableIngredientRowProps {
	ingredient: Ingredient;
	onChange: (ingredient: Ingredient) => void;
	onRemove: () => void;
}

// --- Subcomponents ---

const AmountInput = ({
	amount,
	onChange
}: {
	amount: number;
	onChange: (amount: number) => void;
}) => (
	<input
		type='number'
		min={0}
		step='any'
		value={amount}
		onChange={(e) => onChange(Number(e.target.value) || 0)}
		className='w-16 p-1.5 text-sm border border-border rounded-lg bg-bg text-text outline-none focus:ring-2 focus:ring-accent transition-colors'
	/>
);

const CustomUnitDropdown = ({
	unit,
	units,
	onChange
}: {
	unit: string;
	units: Array<{ value: string; label: string }>;
	onChange: (unit: Ingredient['unit']) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const currentLabel = units.find((u) => u.value === unit)?.label || unit;

	return (
		<div
			ref={dropdownRef}
			className='relative w-32'
		>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='w-full flex items-center justify-between gap-2 p-1.5 text-sm border border-border rounded-lg bg-bg-secondary text-text outline-none focus:ring-2 focus:ring-accent transition-colors cursor-pointer'
			>
				<span className='truncate'>{currentLabel}</span>
				<ChevronDown className='w-4 h-4 text-text-secondary shrink-0' />
			</button>

			{isOpen && (
				<div className='absolute left-0 top-full mt-1 w-44 bg-bg border border-border rounded-lg shadow-xl overflow-hidden z-20 py-1 max-h-56 overflow-y-auto'>
					{units.map((u) => {
						const isSelected = unit === u.value;
						return (
							<button
								key={u.value}
								type='button'
								onClick={() => {
									onChange(u.value as Ingredient['unit']);
									setIsOpen(false);
								}}
								className='w-full flex items-center justify-between px-3 py-2 text-sm text-text hover:bg-bg-hover transition-colors text-left cursor-pointer'
							>
								<span
									className={
										isSelected
											? 'font-medium text-accent'
											: ''
									}
								>
									{u.label}
								</span>
								{isSelected && (
									<Check className='w-4 h-4 text-accent shrink-0' />
								)}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

const NameInput = ({
	name,
	onChange
}: {
	name: string;
	onChange: (name: string) => void;
}) => (
	<input
		value={name}
		onChange={(e) => onChange(e.target.value)}
		placeholder='Ingredient name'
		className='flex-1 p-1.5 text-sm border border-border rounded-lg bg-bg text-text placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-accent transition-colors'
	/>
);

const RemoveIngredientButton = ({ onRemove }: { onRemove: () => void }) => (
	<button
		type='button'
		onClick={onRemove}
		aria-label='Remove ingredient'
		className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-red-500 transition-colors shrink-0 cursor-pointer'
	>
		<X className='w-4 h-4' />
	</button>
);

// --- Main Container Component ---

export const EditableIngredientRow = ({
	ingredient,
	onChange,
	onRemove
}: EditableIngredientRowProps) => {
	const currentDef = getUnitDef(ingredient.unit);
	const units = baseUnits.some((u: UnitValue) => u.value === ingredient.unit)
		? baseUnits
		: currentDef
			? [...baseUnits, currentDef]
			: baseUnits;

	return (
		<div className='flex gap-2 items-center py-1'>
			<AmountInput
				amount={ingredient.amount}
				onChange={(amount) => onChange({ ...ingredient, amount })}
			/>
			<CustomUnitDropdown
				unit={ingredient.unit}
				units={units}
				onChange={(unit) => onChange({ ...ingredient, unit })}
			/>
			<NameInput
				name={ingredient.name}
				onChange={(name) => onChange({ ...ingredient, name })}
			/>
			<RemoveIngredientButton onRemove={onRemove} />
		</div>
	);
};
