import { Ingredient } from '../../types';
import { convertForDisplay } from '../../utils/units';
import { usePreferences } from '../../context/PreferencesContext';

export const IngredientRow = ({ amount, unit, name }: Ingredient) => {
	const { unitSystem } = usePreferences();
	const display = convertForDisplay(amount, unit, unitSystem);

	return (
		<div className='flex gap-2 p-2 border-b border-border text-sm'>
			<span className='font-bold text-text-secondary w-20 shrink-0'>
				{display.amount} {display.label}
			</span>
			<span className='text-text'>{name}</span>
		</div>
	);
};
