import { recipes } from '../../schema';
import { UserScopedBaseRepo } from './base';

export class RecipesRepo extends UserScopedBaseRepo<typeof recipes> {
	constructor() {
		super(recipes);
	}
}
export const recipesRepo = new RecipesRepo();
