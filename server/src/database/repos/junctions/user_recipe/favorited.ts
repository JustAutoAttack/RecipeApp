import { favorited_recipes } from '../../../schema';
import { UserRecipeJunctionBaseRepo } from './base';

export class FavoritedRecipesRepo extends UserRecipeJunctionBaseRepo<
	typeof favorited_recipes
> {
	constructor() {
		super(favorited_recipes);
	}
}
export const favoritedRecipesRepo = new FavoritedRecipesRepo();
