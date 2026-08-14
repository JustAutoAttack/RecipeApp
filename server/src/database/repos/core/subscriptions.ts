import { eq } from 'drizzle-orm';

import { subscriptions } from '../../schema';
import { CoreBaseRepo } from './base';

export class SubscriptionsRepo extends CoreBaseRepo<typeof subscriptions> {
	constructor() {
		super(subscriptions);
	}

	async findByUserId(userId: string) {
		const result = this.db
			.select()
			.from(this.table)
			.where(eq(this.table.user_id, userId))
			.get();
		return result;
	}
}

export const subscriptionsRepo = new SubscriptionsRepo();
