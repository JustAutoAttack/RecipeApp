import { createRoute } from '@hono/zod-openapi';

import {
	ErrorSchema,
	FollowActionResponseSchema,
	UpdateUserProfileSchema,
	UserParamSchema,
	UserPrivateProfileSchema,
	UserPublicProfileSchema
} from './schemas';

export const getMeRoute = createRoute({
	method: 'get',
	path: '/me',
	tags: ['Users'],
	summary: 'Get Authenticated User Profile',
	description:
		'Returns private details, preferences, and allergens for the current session.',
	responses: {
		200: {
			content: {
				'application/json': { schema: UserPrivateProfileSchema }
			},
			description: 'Authenticated user profile retrieved'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Unauthorized access'
		}
	}
});

export const updateMeRoute = createRoute({
	method: 'patch',
	path: '/me',
	tags: ['Users'],
	summary: 'Update Authenticated User Profile',
	description:
		'Updates display name, theme, allergens, or pantry tracking settings.',
	request: {
		body: {
			content: {
				'application/json': { schema: UpdateUserProfileSchema }
			}
		}
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: UserPrivateProfileSchema }
			},
			description: 'Profile updated successfully'
		},
		400: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Invalid input payload'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Unauthorized access'
		}
	}
});

export const getUserByIdRoute = createRoute({
	method: 'get',
	path: '/{id}',
	tags: ['Users'],
	summary: 'Get Public User Profile',
	description:
		'Returns aggregated user stats, subscription details, and counts from public view.',
	request: {
		params: UserParamSchema
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: UserPublicProfileSchema }
			},
			description: 'Public profile retrieved'
		},
		404: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'User not found'
		}
	}
});

export const followUserRoute = createRoute({
	method: 'post',
	path: '/{id}/follow',
	tags: ['Users'],
	summary: 'Follow User',
	description:
		'Establishes a social follow relationship with the target user.',
	request: {
		params: UserParamSchema
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: FollowActionResponseSchema }
			},
			description: 'User followed successfully'
		},
		400: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Cannot follow yourself or invalid target'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Unauthorized access'
		}
	}
});

export const unfollowUserRoute = createRoute({
	method: 'delete',
	path: '/{id}/follow',
	tags: ['Users'],
	summary: 'Unfollow User',
	description:
		'Removes an existing follow relationship with the target user.',
	request: {
		params: UserParamSchema
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: FollowActionResponseSchema }
			},
			description: 'User unfollowed successfully'
		},
		401: {
			content: { 'application/json': { schema: ErrorSchema } },
			description: 'Unauthorized access'
		}
	}
});
