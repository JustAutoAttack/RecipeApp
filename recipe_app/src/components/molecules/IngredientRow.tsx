import { Ingredient } from '../../types';

export const IngredientRow = ({ amount, unit, name }: Ingredient) => (
	<div className='flex gap-2 p-2 border-b border-border text-sm'>
		<span className='font-bold text-text-secondary'>
			{amount} {unit}
		</span>
		<span className='text-text'>{name}</span>
	</div>
);
