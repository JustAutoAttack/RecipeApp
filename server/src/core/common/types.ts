import type { z } from 'zod';

import type {
	messageResponseSchema,
	tokenPairSchema,
	metaSchema,
	uuidParamSchema
} from './schemas';

// Base DTOs
export type MetaDTO = z.infer<typeof metaSchema>;
export type UUIDParamDTO = z.infer<typeof uuidParamSchema>;

// API Response Wrappers
export interface ApiResponse<T = unknown> {
	readonly success: boolean;
	readonly message?: string;
	readonly data?: T;
	readonly error?: string;
}

export type TokenPairDTO = z.infer<typeof tokenPairSchema>;
export type MessageResponseDTO = z.infer<typeof messageResponseSchema>;

// Auth Context
export interface AuthContext {
	readonly userId: string;
}

// JWT Structures
export interface JwtHeader {
	readonly alg: 'HS256';
	readonly typ: 'JWT';
}

export interface JwtMeta {
	readonly iat?: number;
	readonly exp?: number;
}

export interface JwtBody {
	readonly sub: string;
	readonly email?: string;
}

export type JwtPayload = JwtBody & JwtMeta;
