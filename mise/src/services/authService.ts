import { invoke } from '@tauri-apps/api/core';

import { UserRow } from './userService';

export interface AuthResponse {
	user: UserRow;
	token: string;
}

export const authService = {
	async signUp(username: string): Promise<AuthResponse> {
		return invoke<AuthResponse>('sign_up', { username });
	},

	async signIn(username: string): Promise<AuthResponse> {
		return invoke<AuthResponse>('sign_in', { username });
	}
};
