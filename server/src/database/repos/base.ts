import { SQLiteTable } from 'drizzle-orm/sqlite-core';

import { db } from '../client';

export class BaseRepo<TTable extends SQLiteTable> {
	protected db = db;
	protected table: TTable;

	constructor(table: TTable) {
		this.table = table;
	}
}
