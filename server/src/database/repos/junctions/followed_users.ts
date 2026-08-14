import { eq, and } from 'drizzle-orm';

import { followed_users } from '../../schema';
import { BaseRepo } from '../base';

export class FollowedUsersRepo extends BaseRepo<typeof followed_users> {
	constructor() {
		super(followed_users);
	}

	async findFollowers(userId: string) {
		return this.db
			.select()
			.from(this.table)
			.where(eq(this.table.followed_user_id, userId))
			.all();
	}

	async findFollowing(userId: string) {
		return this.db
			.select()
			.from(this.table)
			.where(eq(this.table.user_id, userId))
			.all();
	}

	async follow(userId: string, targetUserId: string) {
		const results = this.db
			.insert(this.table)
			.values({
				user_id: userId,
				followed_user_id: targetUserId,
				created_at: new Date().toISOString()
			} as any)
			.returning()
			.all();
		return results[0];
	}

	async unfollow(userId: string, targetUserId: string) {
		const existing = this.db
			.select()
			.from(this.table)
			.where(
				and(
					eq(this.table.user_id, userId),
					eq(this.table.followed_user_id, targetUserId)
				)
			)
			.get();
		if (!existing) return undefined;
		this.db
			.delete(this.table)
			.where(
				and(
					eq(this.table.user_id, userId),
					eq(this.table.followed_user_id, targetUserId)
				)
			)
			.run();
		return existing;
	}
}

export const followedUsersRepo = new FollowedUsersRepo();
