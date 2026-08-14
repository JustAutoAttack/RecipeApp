import { eq, and } from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';

import { BaseRepo } from '../../base';

export class UserRecipeJunctionBaseRepo<
	TTable extends SQLiteTable & {
		user_id: any;
		recipe_id: any;
		created_at: any;
	},
	TSelect = TTable['$inferSelect']
> extends BaseRepo<TTable> {
	async findByUser(userId: string): Promise<TSelect[]> {
		const results = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.user_id, userId))
			.all();
		return results as unknown as TSelect[];
	}

	async findByRecipe(recipeId: string): Promise<TSelect[]> {
		const results = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.recipe_id, recipeId))
			.all();
		return results as unknown as TSelect[];
	}

	async findOne(
		userId: string,
		recipeId: string
	): Promise<TSelect | undefined> {
		const result = this.db
			.select()
			.from(this.table)
			.where(
				and(
					eq(this.table.user_id, userId),
					eq(this.table.recipe_id, recipeId)
				)
			)
			.get();
		return result as unknown as TSelect | undefined;
	}

	async add(userId: string, recipeId: string): Promise<TSelect> {
		const results = this.db
			.insert(this.table)
			.values({
				user_id: userId,
				recipe_id: recipeId,
				created_at: new Date().toISOString()
			} as any)
			.returning()
			.all() as unknown as TSelect[];
		return results[0] as TSelect;
	}

	async remove(
		userId: string,
		recipeId: string
	): Promise<TSelect | undefined> {
		const existing = await this.findOne(userId, recipeId);
		if (!existing) return undefined;
		this.db
			.delete(this.table)
			.where(
				and(
					eq(this.table.user_id, userId),
					eq(this.table.recipe_id, recipeId)
				)
			)
			.run();
		return existing;
	}
}
