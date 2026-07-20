import { Clock } from 'lucide-react';

import { IngredientRow } from '../molecules/IngredientRow';
import { Badge } from '../atoms/Badge';
import { Recipe } from '../../types';
import { formatCookTime } from '../../utils/time';

interface ViewProps {
	recipe: Recipe;
}

export const RecipeView = ({ recipe }: ViewProps) => (
	<div className='p-4 pb-20 max-w-2xl mx-auto'>
		<h1 className='text-2xl font-bold text-text'>{recipe.title}</h1>

		<div className='flex items-center gap-3 mt-2'>
			<div className='flex items-center gap-1 text-sm text-text-secondary font-mono'>
				<Clock className='w-4 h-4' />
				{formatCookTime(recipe.cook_time_minutes)}
			</div>
			<div className='flex flex-wrap gap-1'>
				{recipe.cuisine.map((c) => (
					<Badge
						key={c}
						label={c}
					/>
				))}
			</div>
		</div>

		<section className='mt-6'>
			<h2 className='text-lg font-semibold text-text mb-2'>
				Ingredients
			</h2>
			{recipe.ingredients.length > 0 ? (
				recipe.ingredients.map((i) => (
					<IngredientRow
						key={i.id}
						{...i}
					/>
				))
			) : (
				<p className='text-sm text-text-secondary'>
					No ingredients added yet.
				</p>
			)}
		</section>

		<section className='mt-6'>
			<h2 className='text-lg font-semibold text-text mb-2'>
				Instructions
			</h2>
			{recipe.instructions.length > 0 ? (
				<ol className='space-y-3'>
					{recipe.instructions.map((step, idx) => (
						<li
							key={idx}
							className='flex gap-3 text-sm text-text'
						>
							<span className='font-mono text-text-secondary shrink-0'>
								{idx + 1}.
							</span>
							<span>{step}</span>
						</li>
					))}
				</ol>
			) : (
				<p className='text-sm text-text-secondary'>
					No instructions added yet.
				</p>
			)}
		</section>
	</div>
);
