import { createContext } from 'react';

import { ICookModeContext } from './types';

export const CookModeContext = createContext<ICookModeContext | undefined>(
	undefined
);
