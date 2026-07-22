import { X } from 'lucide-react';

import { Ingredient } from '../../types';
import { getSelectableUnits, getUnitDef } from '../../utils/units';
import { usePreferences } from '../../context/PreferencesContext';

interface Props {
	ingredient: Ingredient;
	onChange: (ingredient: Ingredient) => void;
	onRemove: () => void;
}

export const EditableIngredientRow = ({
	ingredient,
	onChange,
	onRemove
}: Props) => {
	const { unitSystem } = usePreferences();
	const baseUnits = getSelectableUnits(unitSystem);
	const currentDef = getUnitDef(ingredient.unit);
	const units = baseUnits.some((u) => u.value === ingredient.unit)
		? baseUnits
		: currentDef
			? [...baseUnits, currentDef]
			: baseUnits;

	return (
		<div className='flex gap-2 items-center py-1'>
			<input
				type='number'
				min={0}
				step='any'
				value={ingredient.amount}
				onChange={(e) =>
					onChange({
						...ingredient,
						amount: Number(e.target.value) || 0
					})
				}
				className='w-16 p-1.5 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent'
			/>
			<select
				value={ingredient.unit}
				onChange={(e) =>
					onChange({
						...ingredient,
						unit: e.target.value as Ingredient['unit']
					})
				}
				className='w-32 p-1.5 text-sm border border-border rounded-lg text-text bg-white outline-none focus:ring-2 focus:ring-accent'
			>
				{units.map((u) => (
					<option
						key={u.value}
						value={u.value}
					>
						{u.label}
					</option>
				))}
			</select>
			<input
				value={ingredient.name}
				onChange={(e) =>
					onChange({ ...ingredient, name: e.target.value })
				}
				placeholder='Ingredient name'
				className='flex-1 p-1.5 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent'
			/>
			<button
				type='button'
				onClick={onRemove}
				aria-label='Remove ingredient'
				className='p-1.5 rounded-lg text-text-secondary hover:bg-bg-hover shrink-0'
			>
				<X className='w-4 h-4' />
			</button>
		</div>
	);
};
