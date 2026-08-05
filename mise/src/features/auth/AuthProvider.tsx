import { useState } from 'react';

import { User } from '../../domain/user';
import { TauriAuthService } from '../../services';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<User | null>(() => {
		const saved = localStorage.getItem('recipe_user');
		return saved ? JSON.parse(saved) : null;
	});
	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem('recipe_token');
	});

	const login = (userId: string, username: string, authToken: string) => {
		const newUser = {
			id: userId,
			username,
			created_at: new Date().toISOString()
		};
		setUser(newUser);
		setToken(authToken);
		localStorage.setItem('recipe_user', JSON.stringify(newUser));
		localStorage.setItem('recipe_token', authToken);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('recipe_user');
		localStorage.removeItem('recipe_token');
	};

	const signUp = async (username: string) => {
		try {
			const data = await TauriAuthService.signUp(username);
			login(data.user.id, data.user.username, data.token);
		} catch (err) {
			throw new Error(typeof err === 'string' ? err : 'Sign up failed.');
		}
	};

	const signIn = async (username: string) => {
		try {
			const data = await TauriAuthService.signIn(username);
			login(data.user.id, data.user.username, data.token);
		} catch (err) {
			throw new Error(typeof err === 'string' ? err : 'Sign in failed.');
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, token, login, logout, signIn, signUp }}
		>
			{children}
		</AuthContext.Provider>
	);
};
