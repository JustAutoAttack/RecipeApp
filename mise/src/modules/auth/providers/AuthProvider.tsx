import React, { useState } from 'react';

import type { User } from '@user';
import { mapUserRowToUser } from '@user';
import { AuthContext } from '../context';
import { TauriAuthService } from '../services';

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

	const login = (authUser: User, authToken: string) => {
		setUser(authUser);
		setToken(authToken);
		localStorage.setItem('recipe_user', JSON.stringify(authUser));
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
			const mappedUser = mapUserRowToUser(data.user);
			login(mappedUser, data.token);
		} catch (err) {
			throw new Error(typeof err === 'string' ? err : 'Sign up failed.');
		}
	};

	const signIn = async (username: string) => {
		try {
			const data = await TauriAuthService.signIn(username);
			const mappedUser = mapUserRowToUser(data.user);
			login(mappedUser, data.token);
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
