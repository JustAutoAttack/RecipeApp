import { createContext } from 'react';

import { ThemeMode } from './types';

export interface ThemeContextType {
	theme: ThemeMode;
	toggleTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);
