import { eq, and } from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';

import { BaseRepo } from '../base';

export class UserScopedBaseRepo<
	TTable extends SQLiteTable & { id: any; owner_id: any },
	TSelect = TTable['$inferSelect'],
	TInsert = TTable['$inferInsert']
> extends BaseRepo<TTable> {
	async findByUserId(userId: string): Promise<TSelect[]> {
		const results = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.owner_id, userId))
			.all();
		return results as unknown as TSelect[];
	}

	async findByIdAndUser(
		id: string,
		userId: string
	): Promise<TSelect | undefined> {
		const result = this.db
			.select()
			.from(this.table)
			.where(and(eq(this.table.id, id), eq(this.table.owner_id, userId)))
			.get();
		return result as unknown as TSelect | undefined;
	}

	async create(data: TInsert): Promise<TSelect> {
		const results = this.db
			.insert(this.table)
			.values(data as any)
			.returning()
			.all() as unknown as TSelect[];
		return results[0] as TSelect;
	}

	async updateByUser(
		id: string,
		userId: string,
		data: Partial<TInsert>
	): Promise<TSelect | undefined> {
		const result = this.db
			.update(this.table)
			.set(data as any)
			.where(and(eq(this.table.id, id), eq(this.table.owner_id, userId)))
			.returning()
			.get();
		return result as unknown as TSelect | undefined;
	}

	async deleteByUser(
		id: string,
		userId: string
	): Promise<TSelect | undefined> {
		const item = await this.findByIdAndUser(id, userId);
		if (!item) return undefined;
		this.db
			.delete(this.table)
			.where(and(eq(this.table.id, id), eq(this.table.owner_id, userId)))
			.run();
		return item;
	}
}
