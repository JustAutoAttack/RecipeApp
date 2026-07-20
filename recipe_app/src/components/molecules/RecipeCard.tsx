import { Clock } from 'lucide-react';

import { Badge } from '../atoms/Badge';
import { Recipe } from '../../types';
import { formatCookTime } from '../../utils/time';

interface Props {
	recipe: Recipe;
	onClick: () => void;
}

export const RecipeCard = ({ recipe, onClick }: Props) => (
	<div
		onClick={onClick}
		className='bg-bg rounded-xl shadow-sm border border-border overflow-hidden cursor-pointer active:scale-95 transition-transform'
	>
		<div className='aspect-video bg-bg-hover' />
		<div className='p-3'>
			<h3 className='font-semibold text-text truncate'>{recipe.title}</h3>

			<div className='flex items-center gap-1 mt-1 text-xs text-text-secondary font-mono'>
				<Clock className='w-3 h-3' />
				{formatCookTime(recipe.cook_time_minutes)}
			</div>

			<div className='flex flex-wrap gap-1 mt-2'>
				{recipe.cuisine.map((c) => (
					<Badge
						key={c}
						label={c}
					/>
				))}
			</div>
		</div>
	</div>
);
