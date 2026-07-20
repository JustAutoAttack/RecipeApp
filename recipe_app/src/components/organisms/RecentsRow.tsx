import { RecipeCard } from '../molecules/RecipeCard';
import { Recipe } from '../../types';

interface Props {
	recipes: Recipe[];
	onRecipeClick: (id: string) => void;
}

export const RecentsRow = ({ recipes, onRecipeClick }: Props) => (
	<div className='flex gap-4 overflow-x-auto pb-2'>
		{recipes.map((r) => (
			<div
				key={r.id}
				className='w-40 shrink-0'
			>
				<RecipeCard
					recipe={r}
					onClick={() => onRecipeClick(r.id)}
				/>
			</div>
		))}
	</div>
);
