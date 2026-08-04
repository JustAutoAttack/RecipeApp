import React, { createContext, useContext, useState } from 'react';

import { authService } from '../services/authService';

interface User {
	id: string;
	username: string;
	created_at: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (userId: string, username: string, token: string) => void;
	logout: () => void;
	signIn: (username: string) => Promise<void>;
	signUp: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
			const data = await authService.signUp(username);
			login(data.user.id, data.user.username, data.token);
		} catch (err) {
			throw new Error(typeof err === 'string' ? err : 'Sign up failed.');
		}
	};

	const signIn = async (username: string) => {
		try {
			const data = await authService.signIn(username);
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

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error('useAuth must be used within an AuthProvider');
	return context;
};
