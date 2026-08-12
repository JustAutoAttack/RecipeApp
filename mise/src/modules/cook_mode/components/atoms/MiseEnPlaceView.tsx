import { Check, Play } from 'lucide-react';

import { Recipe } from '@recipes';

interface Props {
	recipe: Recipe;
	checkedIngredients: Record<string, boolean>;
	toggleIngredient: (id: string) => void;
	onStartCooking: () => void;
}

export const MiseEnPlaceView = ({
	recipe,
	checkedIngredients,
	toggleIngredient,
	onStartCooking
}: Props) => (
	<div className='space-y-6'>
		<div className='text-center space-y-2'>
			<h3 className='text-2xl font-bold text-text'>
				Gather & Prep Ingredients
			</h3>
			<p className='text-sm text-text-secondary'>
				Verify all items are ready before starting the stove.
			</p>
		</div>

		<div className='bg-bg-secondary border border-border rounded-xl p-4 space-y-2 max-h-[50vh] overflow-y-auto'>
			{recipe.ingredients.map((ing) => {
				const isChecked = !!checkedIngredients[ing.id];
				return (
					<button
						key={ing.id}
						type='button'
						onClick={() => toggleIngredient(ing.id)}
						className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left cursor-pointer ${
							isChecked
								? 'bg-emerald-500/10 border-emerald-500/30 text-text-secondary line-through'
								: 'bg-bg border-border text-text hover:border-accent'
						}`}
					>
						<span className='text-sm font-medium'>
							{ing.amount} {ing.unit ? ing.unit : ''} {ing.name}
						</span>
						<div
							className={`w-5 h-5 rounded flex items-center justify-center border ${
								isChecked
									? 'bg-emerald-600 border-emerald-600 text-white'
									: 'border-border'
							}`}
						>
							{isChecked && <Check className='w-3.5 h-3.5' />}
						</div>
					</button>
				);
			})}
		</div>

		<button
			type='button'
			onClick={onStartCooking}
			className='w-full py-3 rounded-xl bg-accent text-white font-medium flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-sm cursor-pointer'
		>
			<Play className='w-4 h-4 fill-white' /> Start Cooking
		</button>
	</div>
);
