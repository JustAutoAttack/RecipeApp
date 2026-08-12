import { z } from 'zod';

export const metaSchema = z.object({
	id: z.string().uuid(),
	updated_at: z.string(),
	created_at: z.string()
});

export const uuidParamSchema = z.object({
	id: z.string().uuid('Invalid UUID format')
});

