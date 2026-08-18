import { RouteHandler } from '@hono/zod-openapi';

import {
	followUserRoute,
	getMeRoute,
	getUserByIdRoute,
	unfollowUserRoute,
	updateMeRoute
} from './routes';
import { usersService } from './service';

export const handleGetMe: RouteHandler<typeof getMeRoute> = async (ctx) => {
	// TODO: Pull active userId from auth middleware context (e.g. ctx.get('userId'))
	const userId = 'usr_123456';
	const profile = await usersService.getPrivateProfile(userId);

	if (!profile) {
		return ctx.json({ error: 'User profile not found' }, 401);
	}

	return ctx.json(profile, 200);
};

export const handleUpdateMe: RouteHandler<typeof updateMeRoute> = async (
	ctx
) => {
	const userId = 'usr_123456';
	const body = ctx.req.valid('json');

	const updatedProfile = await usersService.updatePrivateProfile(
		userId,
		body
	);
	return ctx.json(updatedProfile, 200);
};

export const handleGetUserById: RouteHandler<typeof getUserByIdRoute> = async (
	ctx
) => {
	const { id } = ctx.req.valid('param');
	const profile = await usersService.getPublicProfile(id);

	if (!profile) {
		return ctx.json({ error: 'User not found' }, 404);
	}

	return ctx.json(profile, 200);
};

export const handleFollowUser: RouteHandler<typeof followUserRoute> = async (
	ctx
) => {
	const currentUserId = 'usr_123456';
	const { id: targetUserId } = ctx.req.valid('param');

	if (currentUserId === targetUserId) {
		return ctx.json({ error: 'You cannot follow yourself' }, 400);
	}

	await usersService.followUser(currentUserId, targetUserId);
	return ctx.json(
		{ success: true, message: 'User followed successfully' },
		200
	);
};

export const handleUnfollowUser: RouteHandler<
	typeof unfollowUserRoute
> = async (ctx) => {
	const currentUserId = 'usr_123456';
	const { id: targetUserId } = ctx.req.valid('param');

	await usersService.unfollowUser(currentUserId, targetUserId);
	return ctx.json(
		{ success: true, message: 'User unfollowed successfully' },
		200
	);
};
