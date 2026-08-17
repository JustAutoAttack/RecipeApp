import { z } from '@hono/zod-openapi';

export const ErrorSchema = z.object({
	error: z.string().openapi({ example: 'Invalid credentials' })
});

export const SignUpSchema = z.object({
	email: z.string().email().openapi({ example: 'user@example.com' }),
	password: z.string().min(8).openapi({ example: 'SuperSecret123!' }),
	username: z.string().min(1).openapi({ example: 'AlexDeveloper' })
});

export const SignInSchema = z.object({
	email: z.string().email().openapi({ example: 'user@example.com' }),
	password: z.string().min(1).openapi({ example: 'SuperSecret123!' })
});

export const RefreshSchema = z.object({
	refreshToken: z
		.string()
		.min(1)
		.openapi({ example: 'eyJhbGciOiJIUzI1Ni...' })
});

export const UserSchema = z.object({
	id: z.string().openapi({ example: 'usr_123456' }),
	email: z.string().email().openapi({ example: 'user@example.com' }),
	username: z.string().openapi({ example: 'Alex Developer' })
});

export const AuthTokensSchema = z.object({
	accessToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
	refreshToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
	user: UserSchema
});

export const RefreshResponseSchema = z.object({
	accessToken: z.string().openapi({ example: 'eyJhbGciOiJIUzI1Ni...' }),
	refreshToken: z
		.string()
		.optional()
		.openapi({ example: 'eyJhbGciOiJIUzI1Ni...' })
});

export const SignOutResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: 'Signed out successfully' })
});
