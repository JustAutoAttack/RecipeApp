import {
	AddGroceryItemInput,
	CreateGroceryListInput,
	GroceryItem,
	GroceryList,
	UpdateGroceryItemInput
} from './types';

export class GroceryListsService {
	async listLists(userId: string): Promise<GroceryList[]> {
		// TODO: Query `grocery_lists` joined with `grocery_items`
		return [];
	}

	async getListById(id: string, userId: string): Promise<GroceryList | null> {
		// TODO: Get list by ID and owner
		return null;
	}

	async createList(
		userId: string,
		input: CreateGroceryListInput
	): Promise<GroceryList> {
		const now = new Date().toISOString();
		return {
			id: 'lst_' + Date.now(),
			userId,
			name: input.name,
			items: [],
			updatedAt: now,
			createdAt: now
		};
	}

	async addItem(
		listId: string,
		userId: string,
		input: AddGroceryItemInput
	): Promise<GroceryItem | null> {
		const now = new Date().toISOString();
		return {
			id: 'itm_' + Date.now(),
			listId,
			name: input.name,
			amount: input.amount,
			unit: input.unit,
			checked: false,
			createdAt: now
		};
	}

	async updateItem(
		listId: string,
		itemId: string,
		userId: string,
		input: UpdateGroceryItemInput
	): Promise<GroceryItem | null> {
		// TODO: Update item details
		return null;
	}

	async deleteItem(
		listId: string,
		itemId: string,
		userId: string
	): Promise<boolean> {
		// TODO: Delete item from list
		return true;
	}
}

export const groceryListsService = new GroceryListsService();
