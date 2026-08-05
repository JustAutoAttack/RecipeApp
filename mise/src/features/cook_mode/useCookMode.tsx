import { useContext } from 'react';

import { CookModeContext } from './CookModeContext';

export const useCookMode = () => {
	const ctx = useContext(CookModeContext);
	if (!ctx)
		throw new Error('useCookMode must be used within a CookModeProvider');
	return ctx;
};
