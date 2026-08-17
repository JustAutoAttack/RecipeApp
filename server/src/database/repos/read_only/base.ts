import { eq } from 'drizzle-orm';

import { db } from '../../client';

export class ReadonlyRepo<
	TView,
	TSelect = TView extends { $inferSelect: infer U } ? U : any
> {
	protected db = db;
	protected table: TView;

	constructor(table: TView) {
		this.table = table;
	}

	async findAll(): Promise<TSelect[]> {
		const results = this.db
			.select()
			.from(this.table as any)
			.all();
		return results as unknown as TSelect[];
	}

	async findById(
		idColumn: any,
		id: string | number
	): Promise<TSelect | undefined> {
		const result = this.db
			.select()
			.from(this.table as any)
			.where(eq(idColumn, id))
			.get();
		return result as unknown as TSelect | undefined;
	}
}
