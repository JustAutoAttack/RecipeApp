import { createContext } from 'react';

import { User } from '../../domain/user';

export interface IAuthContext {
	user: User | null;
	token: string | null;
	login: (userId: string, username: string, token: string) => void;
	logout: () => void;
	signIn: (username: string) => Promise<void>;
	signUp: (username: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
