import { z } from '@hono/zod-openapi';

export const ErrorSchema = z.object({
	error: z.string().openapi({ example: 'User not found' })
});

export const UserParamSchema = z.object({
	id: z.string().openapi({ example: 'usr_123456', description: 'User ID' })
});

export const UserPrivateProfileSchema = z.object({
	id: z.string().openapi({ example: 'usr_123456' }),
	username: z.string().openapi({ example: 'johndoe' }),
	email: z.string().email().openapi({ example: 'john@example.com' }),
	displayName: z.string().openapi({ example: 'John Doe' }),
	theme: z.string().openapi({ example: 'system' }),
	allergens: z
		.array(z.string())
		.openapi({ example: ['peanuts', 'shellfish'] }),
	pantryTrackingEnabled: z.boolean().openapi({ example: true }),
	lastConnectionDate: z
		.string()
		.nullable()
		.openapi({ example: '2026-08-17T14:30:00.000Z' }),
	updatedAt: z.string().openapi({ example: '2026-08-17T14:30:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-01T10:00:00.000Z' })
});

export const UserPublicProfileSchema = z.object({
	id: z.string().openapi({ example: 'usr_123456' }),
	username: z.string().openapi({ example: 'johndoe' }),
	displayName: z.string().openapi({ example: 'John Doe' }),
	theme: z.string().openapi({ example: 'system' }),
	allergens: z.array(z.string()).openapi({ example: ['peanuts'] }),
	lastConnectionDate: z
		.string()
		.nullable()
		.openapi({ example: '2026-08-17T14:30:00.000Z' }),
	subscriptionTier: z.enum(['free', 'pro']).openapi({ example: 'pro' }),
	subscriptionStatus: z
		.enum(['active', 'past_due', 'canceled'])
		.openapi({ example: 'active' }),
	recipeCount: z.number().openapi({ example: 12 }),
	totalLikesReceived: z.number().openapi({ example: 145 }),
	totalFavoritesReceived: z.number().openapi({ example: 68 }),
	followerCount: z.number().openapi({ example: 89 }),
	followingCount: z.number().openapi({ example: 42 }),
	updatedAt: z.string().openapi({ example: '2026-08-17T14:30:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-01T10:00:00.000Z' })
});

export const UpdateUserProfileSchema = z.object({
	displayName: z
		.string()
		.min(1)
		.optional()
		.openapi({ example: 'Johnny Doe' }),
	theme: z
		.enum(['light', 'dark', 'system'])
		.optional()
		.openapi({ example: 'dark' }),
	allergens: z
		.array(z.string())
		.optional()
		.openapi({ example: ['peanuts', 'gluten'] }),
	pantryTrackingEnabled: z.boolean().optional().openapi({ example: false })
});

export const FollowActionResponseSchema = z.object({
	success: z.boolean().openapi({ example: true }),
	message: z.string().openapi({ example: 'User followed successfully' })
});
