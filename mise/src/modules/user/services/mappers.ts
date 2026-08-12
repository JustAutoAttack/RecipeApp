import type { UserRow, User } from '../types';

export const mapUserRowToUser = (row: UserRow): User => ({
	id: row.id,
	username: row.username,
	createdAt: row.created_at
});
