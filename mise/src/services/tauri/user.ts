import { invoke } from '@tauri-apps/api/core';
import { UserRow } from '../../types/storage';

export const TauriUserService = {
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
