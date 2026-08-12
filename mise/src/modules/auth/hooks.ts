import { useSafeContext } from '@core';
import { IAuthContext } from './types';
import { AuthContext } from './context';

export const useAuth = (): IAuthContext =>
	useSafeContext(AuthContext, 'useAuth', 'AuthProvider');
