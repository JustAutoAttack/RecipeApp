import { Ingredient } from '../../../../domain/recipe';

export const IngredientRow = ({ amount, unit, name }: Ingredient) => {
	return (
		<div className='flex gap-2 p-2 border-b border-border text-sm'>
			<span className='font-bold text-text-secondary w-20 shrink-0'>
				{amount} {unit}
			</span>
			<span className='text-text'>{name}</span>
		</div>
	);
};
