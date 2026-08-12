import jwt from 'jsonwebtoken';

import { AuthContext } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';
const JWT_REFRESH_SECRET =
	process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key';

export class JwtService {
	static generateTokenPair(payload: AuthContext) {
		const access_token = jwt.sign(payload, JWT_SECRET, {
			expiresIn: '15m'
		});
		const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, {
			expiresIn: '7d'
		});
		return { access_token, refresh_token };
	}

	static verifyAccessToken(token: string): AuthContext | null {
		try {
			return jwt.verify(token, JWT_SECRET) as AuthContext;
		} catch {
			return null;
		}
	}

	static verifyRefreshToken(token: string): AuthContext | null {
		try {
			return jwt.verify(token, JWT_REFRESH_SECRET) as AuthContext;
		} catch {
			return null;
		}
	}
}
