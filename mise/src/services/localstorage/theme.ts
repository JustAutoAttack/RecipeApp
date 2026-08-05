import { ThemeMode } from '../../core';

const THEME_STORAGE_KEY = 'mise_theme_preference';

export const LocalStorageThemeService = {
	getStoredTheme(): ThemeMode {
		try {
			const stored = localStorage.getItem(THEME_STORAGE_KEY);
			if (stored === 'light' || stored === 'dark') {
				return stored;
			}
			// Check system preference fallback
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				return 'dark';
			}
		} catch (e) {
			console.error('Failed to access localStorage for theme:', e);
		}
		return 'light';
	},

	saveTheme(theme: ThemeMode): void {
		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
			// Future extension point: sync with remote server profile settings
			// api.post('/users/preferences', { theme });
		} catch (e) {
			console.error('Failed to save theme to localStorage:', e);
		}
	}
};
