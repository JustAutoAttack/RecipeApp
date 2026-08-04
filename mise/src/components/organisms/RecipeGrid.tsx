import { ParsedRecipe } from '../../context/RecipeContext';
import { RecipeCard } from '../molecules/RecipeCard';

interface Props {
	recipes: ParsedRecipe[];
	onSelectRecipe: (id: string) => void;
}

export const RecipeGrid = ({ recipes, onSelectRecipe }: Props) => {
	if (recipes.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-text-secondary text-sm'>No recipes found.</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
			{recipes.map((recipe) => (
				<RecipeCard
					key={recipe.id}
					recipe={recipe}
					onClick={() => onSelectRecipe(recipe.id)}
				/>
			))}
		</div>
	);
};
