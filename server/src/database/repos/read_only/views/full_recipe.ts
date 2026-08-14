import { full_recipe_view } from '../../../schema';
import { ReadonlyRepo } from '../base';

export class FullRecipeViewRepo extends ReadonlyRepo<typeof full_recipe_view> {
	constructor() {
		super(full_recipe_view);
	}
}
export const fullRecipeViewRepo = new FullRecipeViewRepo();
