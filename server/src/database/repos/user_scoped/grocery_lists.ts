import { grocery_lists } from '../../schema';
import { UserScopedBaseRepo } from './base';

export class GroceryListsRepo extends UserScopedBaseRepo<typeof grocery_lists> {
	constructor() {
		super(grocery_lists);
	}
}
export const groceryListsRepo = new GroceryListsRepo();
