import { eq } from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';

import { BaseRepo } from '../base';

export class CoreBaseRepo<
	TTable extends SQLiteTable & { id: any },
	TSelect = TTable['$inferSelect'],
	TInsert = TTable['$inferInsert']
> extends BaseRepo<TTable> {
	async findAll(): Promise<TSelect[]> {
		const results = this.db.select().from(this.table).all();
		return results as unknown as TSelect[];
	}

	async findById(id: string | number): Promise<TSelect | undefined> {
		const result = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.id, id))
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

	async update(
		id: string | number,
		data: Partial<TInsert>
	): Promise<TSelect | undefined> {
		const result = this.db
			.update(this.table)
			.set(data as any)
			.where(eq(this.table.id, id))
			.returning()
			.get();
		return result as unknown as TSelect | undefined;
	}

	async delete(id: string | number): Promise<TSelect | undefined> {
		const item = await this.findById(id);
		if (!item) return undefined;
		this.db.delete(this.table).where(eq(this.table.id, id)).run();
		return item;
	}
}
