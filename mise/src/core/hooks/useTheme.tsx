import { useContext } from 'react';

import { IThemeContext, ThemeContext } from '../context';

export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
