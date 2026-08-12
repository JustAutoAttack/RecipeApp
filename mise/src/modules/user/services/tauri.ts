import { safeInvoke } from '@core/utils/tauri';

import type { UserRow } from '../types';

export const TauriUserService = {
	async getUsers(): Promise<UserRow[]> {
		return safeInvoke<UserRow[]>('get_users');
	},

	async saveUser(user: UserRow): Promise<UserRow> {
		return safeInvoke<UserRow>('save_user', { user });
	},

	async deleteUser(id: string): Promise<void> {
		return safeInvoke<void>('delete_user', { id });
	}
};
