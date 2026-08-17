import { AuthTokens, RefreshResponse, SignInInput, SignUpInput } from './types';

export class AuthService {
	async signUp(input: SignUpInput): Promise<AuthTokens> {
		// TODO: Hash password with bcrypt/argon2, insert into SQLite DB, generate session & JWTs
		return {
			accessToken: 'mock_access_token',
			refreshToken: 'mock_refresh_token',
			user: {
				id: 'usr_' + Date.now(),
				email: input.email,
				username: input.username
			}
		};
	}

	async signIn(input: SignInInput): Promise<AuthTokens> {
		// TODO: Query user by email, verify password hash, issue JWT pair & record session in DB
		return {
			accessToken: 'mock_access_token',
			refreshToken: 'mock_refresh_token',
			user: {
				id: 'usr_123456',
				email: input.email,
				username: 'AlexDeveloper'
			}
		};
	}

	async refreshSession(refreshToken: string): Promise<RefreshResponse> {
		// TODO: Verify refresh token signature, lookup active session in SQLite, issue fresh access token
		return {
			accessToken: 'new_mock_access_token',
			refreshToken
		};
	}

	async signOut(
		refreshToken: string
	): Promise<{ success: boolean; message: string }> {
		// TODO: Delete session from SQLite matching refreshToken
		return {
			success: true,
			message: 'Signed out successfully'
		};
	}
}

export const authService = new AuthService();
