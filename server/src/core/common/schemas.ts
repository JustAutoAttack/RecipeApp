import z from 'zod';

// --- Base ---
export const metaSchema = z.object({
	id: z.string().uuid(),
	updated_at: z.string(),
	created_at: z.string()
});

export const uuidParamSchema = z.object({
	id: z.string().uuid('Invalid UUID format')
});

// --- Token Shapes ---
export const tokenPairSchema = z.object({
	access_token: z.string(),
	refresh_token: z.string()
});

export const messageResponseSchema = z.object({
	success: z.boolean(),
	message: z.string()
});
