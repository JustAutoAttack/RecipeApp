import { invoke } from '@tauri-apps/api/core';

import { AuthResponse } from '../../types/storage';

export const TauriAuthService = {
	async signUp(username: string): Promise<AuthResponse> {
		return invoke<AuthResponse>('sign_up', { username });
	},

	async signIn(username: string): Promise<AuthResponse> {
		return invoke<AuthResponse>('sign_in', { username });
	}
};
