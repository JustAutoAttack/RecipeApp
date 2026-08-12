import { z } from 'zod';
import { metaSchema } from '../shared';

const baseUserSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	email: z.string().email('Invalid email address'),
	display_name: z.string().min(1, 'Display name is required'),
	theme: z.string().default('system'),
	allergens: z.array(z.string()).optional(),
	pantry_tracking_enabled: z.boolean().default(true),
	last_connection_date: z.string().nullable().optional()
});

export const createUserSchema = baseUserSchema.extend({
	password: z.string().min(8, 'Password must be at least 8 characters')
});

export const readUserSchema = baseUserSchema.merge(metaSchema);

export const updateUserSchema = baseUserSchema.partial();
