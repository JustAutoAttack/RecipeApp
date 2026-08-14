import { eq } from 'drizzle-orm';

import { sessions } from '../../schema';
import { CoreBaseRepo } from './base';

export class SessionsRepo extends CoreBaseRepo<typeof sessions> {
	constructor() {
		super(sessions);
	}

	async findByToken(token: string) {
		const result = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.access_token, token))
			.get();
		return result;
	}

	async deleteByToken(token: string) {
		const session = await this.findByToken(token);
		if (!session) return undefined;
		this.db
			.delete(this.table)
			.where(eq(this.table.access_token, token))
			.run();
		return session;
	}
}

export const sessionsRepo = new SessionsRepo();
