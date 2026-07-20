import { RecipeCard } from '../molecules/RecipeCard';
import { Recipe } from '../../types';

interface GridProps {
	recipes: Recipe[];
	onRecipeClick: (id: string) => void;
}

export const RecipeGrid = ({ recipes, onRecipeClick }: GridProps) => (
	<div className='grid grid-cols-2 gap-4 p-4 pb-24'>
		{recipes.map((r) => (
			<RecipeCard
				key={r.id}
				recipe={r}
				onClick={() => onRecipeClick(r.id)}
			/>
		))}
	</div>
);
