import { useSafeContext } from '@core';
import { ICookModeContext } from './types';
import { CookModeContext } from './context';

export const useCookMode = (): ICookModeContext =>
	useSafeContext(CookModeContext, 'useCookMode', 'CookModeProvider');
