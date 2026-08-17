import { eq } from 'drizzle-orm';

import { users } from '../../schema';
import { CoreBaseRepo } from './base';

export class UsersRepo extends CoreBaseRepo<typeof users> {
	constructor() {
		super(users);
	}

	async exists(id: string): Promise<boolean> {
		const result = this.db
			.select({ id: this.table.id })
			.from(this.table)
			.where(eq(this.table.id, id))
			.get();
		return !!result;
	}

	async findByEmail(email: string) {
		const result = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.email, email))
			.get();
		return result;
	}
}

export const usersRepo = new UsersRepo();
