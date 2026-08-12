import { createContext } from 'react';

import { ThemeMode } from '../types';

export interface IThemeContext {
	theme: ThemeMode;
	toggleTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
