import { liked_recipes } from '../../../schema';
import { UserRecipeJunctionBaseRepo } from './base';

export class LikedRecipesRepo extends UserRecipeJunctionBaseRepo<
	typeof liked_recipes
> {
	constructor() {
		super(liked_recipes);
	}
}

export const likedRecipesRepo = new LikedRecipesRepo();
