import { z } from '@hono/zod-openapi';
import {
	AuthTokensSchema,
	RefreshResponseSchema,
	RefreshSchema,
	SignInSchema,
	SignUpSchema,
	UserSchema
} from './schemas';

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type RefreshInput = z.infer<typeof RefreshSchema>;
export type User = z.infer<typeof UserSchema>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
