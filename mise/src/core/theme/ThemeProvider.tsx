import { ReactNode, useEffect, useState } from 'react';

import { LocalStorageThemeService } from '../../services';
import { ThemeMode } from '../types';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<ThemeMode>(() =>
		LocalStorageThemeService.getStoredTheme()
	);

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		LocalStorageThemeService.saveTheme(theme);
	}, [theme]);

	const setTheme = (newTheme: ThemeMode) => {
		setThemeState(newTheme);
	};

	const toggleTheme = () => {
		setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
