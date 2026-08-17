import {
	CreatePantryItemInput,
	PantryItem,
	PantryQuery,
	UpdatePantryItemInput
} from './types';

export class PantriesService {
	async listItems(
		userId: string,
		query: PantryQuery
	): Promise<{ data: PantryItem[]; total: number }> {
		// TODO: Query SQLite `pantries` table filtered by userId
		return { data: [], total: 0 };
	}

	async createItem(
		userId: string,
		input: CreatePantryItemInput
	): Promise<PantryItem> {
		const now = new Date().toISOString();
		return {
			id: 'pnt_' + Date.now(),
			userId,
			name: input.name,
			amount: input.amount,
			unit: input.unit,
			expiresAt: input.expiresAt ?? null,
			updatedAt: now,
			createdAt: now
		};
	}

	async updateItem(
		id: string,
		userId: string,
		input: UpdatePantryItemInput
	): Promise<PantryItem | null> {
		// TODO: Update `pantries` record where id = id AND user_id = userId
		return null;
	}

	async deleteItem(id: string, userId: string): Promise<boolean> {
		// TODO: Delete `pantries` record where id = id AND user_id = userId
		return true;
	}
}

export const pantriesService = new PantriesService();
