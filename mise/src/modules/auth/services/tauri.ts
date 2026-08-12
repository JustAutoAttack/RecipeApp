import { safeInvoke } from '@core/utils/tauri';

import { AuthResponse } from '../types';

export const TauriAuthService = {
	async signUp(username: string): Promise<AuthResponse> {
		return safeInvoke<AuthResponse>('sign_up', { username });
	},

	async signIn(username: string): Promise<AuthResponse> {
		return safeInvoke<AuthResponse>('sign_in', { username });
	}
};
