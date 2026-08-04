import { invoke } from '@tauri-apps/api/core';

export const telemetryService = {
	async checkServerSync(): Promise<string> {
		return invoke<string>('check_server_sync');
	}
};
