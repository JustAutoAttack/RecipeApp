import { RouteHandler } from '@hono/zod-openapi';

import {
	createRecipeRoute,
	deleteRecipeRoute,
	favoriteRecipeRoute,
	getRecipeByIdRoute,
	likeRecipeRoute,
	listRecipesRoute,
	unfavoriteRecipeRoute,
	unlikeRecipeRoute,
	updateRecipeRoute
} from './routes';
import { recipesService } from './service';

export const handleListRecipes: RouteHandler<typeof listRecipesRoute> = async (
	ctx
) => {
	const query = ctx.req.valid('query');
	const { data, total } = await recipesService.listRecipes(query);
	return ctx.json(
		{ data, total, limit: query.limit, offset: query.offset },
		200
	);
};

export const handleCreateRecipe: RouteHandler<
	typeof createRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const body = ctx.req.valid('json');
	const recipe = await recipesService.createRecipe(userId, body);
	return ctx.json(recipe, 201);
};

export const handleGetRecipeById: RouteHandler<
	typeof getRecipeByIdRoute
> = async (ctx) => {
	const { id } = ctx.req.valid('param');
	const recipe = await recipesService.getRecipeById(id);
	if (!recipe) return ctx.json({ error: 'Recipe not found' }, 404);
	return ctx.json(recipe, 200);
};

export const handleUpdateRecipe: RouteHandler<
	typeof updateRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	const body = ctx.req.valid('json');

	const updated = await recipesService.updateRecipe(id, userId, body);
	if (!updated)
		return ctx.json({ error: 'Recipe not found or forbidden' }, 404);
	return ctx.json(updated, 200);
};

export const handleDeleteRecipe: RouteHandler<
	typeof deleteRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');

	const deleted = await recipesService.deleteRecipe(id, userId);
	if (!deleted) return ctx.json({ error: 'Failed to delete recipe' }, 403);
	return ctx.json(
		{ success: true, message: 'Recipe deleted successfully' },
		200
	);
};

export const handleLikeRecipe: RouteHandler<typeof likeRecipeRoute> = async (
	ctx
) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	await recipesService.likeRecipe(userId, id);
	return ctx.json(
		{ success: true, message: 'Recipe liked successfully' },
		200
	);
};

export const handleUnlikeRecipe: RouteHandler<
	typeof unlikeRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	await recipesService.unlikeRecipe(userId, id);
	return ctx.json(
		{ success: true, message: 'Recipe unliked successfully' },
		200
	);
};

export const handleFavoriteRecipe: RouteHandler<
	typeof favoriteRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	await recipesService.favoriteRecipe(userId, id);
	return ctx.json(
		{ success: true, message: 'Recipe favorited successfully' },
		200
	);
};

export const handleUnfavoriteRecipe: RouteHandler<
	typeof unfavoriteRecipeRoute
> = async (ctx) => {
	const userId = 'usr_123456';
	const { id } = ctx.req.valid('param');
	await recipesService.unfavoriteRecipe(userId, id);
	return ctx.json(
		{ success: true, message: 'Recipe unfavorited successfully' },
		200
	);
};
