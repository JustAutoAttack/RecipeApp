import { invoke } from '@tauri-apps/api/core';

export async function safeInvoke<T>(
	command: string,
	args?: Record<string, unknown>
): Promise<T> {
	try {
		return await invoke<T>(command, args);
	} catch (err) {
		// Standardize error handling (Tauri often rejects with strings)
		const message =
			typeof err === 'string'
				? err
				: (err as Error)?.message || 'Unknown Tauri error';
		console.error(`[Tauri Error] command: "${command}"`, message);
		throw new Error(message);
	}
}
