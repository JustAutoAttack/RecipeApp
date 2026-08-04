import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react';

import { themeService, ThemeMode } from '../services/themeService';

interface ThemeContextType {
	theme: ThemeMode;
	toggleTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<ThemeMode>(() =>
		themeService.getStoredTheme()
	);

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		themeService.saveTheme(theme);
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

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
