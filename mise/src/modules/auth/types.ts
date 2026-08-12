import type { User, UserRow } from '@user';

export interface AuthResponse {
	user: UserRow;
	token: string;
}

export interface IAuthContext {
	user: User | null;
	token: string | null;
	login: (user: User, token: string) => void;
	logout: () => void;
	signIn: (username: string) => Promise<void>;
	signUp: (username: string) => Promise<void>;
}
