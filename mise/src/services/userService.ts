import { invoke } from '@tauri-apps/api/core';

export interface UserRow {
	id: string;
	username: string;
	created_at: string;
}

export const userService = {
	async getUsers(): Promise<UserRow[]> {
		return invoke<UserRow[]>('get_users');
	},

	async saveUser(user: UserRow): Promise<UserRow> {
		return invoke<UserRow>('save_user', { user });
	},

	async deleteUser(id: string): Promise<void> {
		return invoke<void>('delete_user', { id });
	}
};
