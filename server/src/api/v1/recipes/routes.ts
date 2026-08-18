import { createRoute } from '@hono/zod-openapi';

import {
	CreateRecipeSchema,
	RecipeActionResponseSchema,
	RecipeErrorSchema,
	RecipeListResponseSchema,
	RecipeParamSchema,
	RecipeQuerySchema,
	RecipeSchema,
	UpdateRecipeSchema
} from './schemas';

export const listRecipesRoute = createRoute({
	method: 'get',
	path: '/',
	tags: ['Recipes'],
	summary: 'List Recipes',
	description:
		'Retrieve paginated recipes from the full recipe view with likes and favorites count.',
	request: { query: RecipeQuerySchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeListResponseSchema }
			},
			description: 'List of recipes retrieved successfully'
		}
	}
});

export const createRecipeRoute = createRoute({
	method: 'post',
	path: '/',
	tags: ['Recipes'],
	summary: 'Create Recipe',
	description: 'Creates a new recipe post.',
	request: {
		body: {
			content: { 'application/json': { schema: CreateRecipeSchema } }
		}
	},
	responses: {
		201: {
			content: { 'application/json': { schema: RecipeSchema } },
			description: 'Recipe created successfully'
		},
		401: {
			content: { 'application/json': { schema: RecipeErrorSchema } },
			description: 'Unauthorized access'
		}
	}
});

export const getRecipeByIdRoute = createRoute({
	method: 'get',
	path: '/{id}',
	tags: ['Recipes'],
	summary: 'Get Recipe by ID',
	description:
		'Returns recipe details aggregated with total likes and favorites.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: { 'application/json': { schema: RecipeSchema } },
			description: 'Recipe retrieved successfully'
		},
		404: {
			content: { 'application/json': { schema: RecipeErrorSchema } },
			description: 'Recipe not found'
		}
	}
});

export const updateRecipeRoute = createRoute({
	method: 'patch',
	path: '/{id}',
	tags: ['Recipes'],
	summary: 'Update Recipe',
	description: 'Updates an existing recipe owned by the authenticated user.',
	request: {
		params: RecipeParamSchema,
		body: {
			content: { 'application/json': { schema: UpdateRecipeSchema } }
		}
	},
	responses: {
		200: {
			content: { 'application/json': { schema: RecipeSchema } },
			description: 'Recipe updated successfully'
		},
		403: {
			content: { 'application/json': { schema: RecipeErrorSchema } },
			description: 'Forbidden (not the recipe owner)'
		},
		404: {
			content: { 'application/json': { schema: RecipeErrorSchema } },
			description: 'Recipe not found'
		}
	}
});

export const deleteRecipeRoute = createRoute({
	method: 'delete',
	path: '/{id}',
	tags: ['Recipes'],
	summary: 'Delete Recipe',
	description: 'Deletes a recipe owned by the authenticated user.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeActionResponseSchema }
			},
			description: 'Recipe deleted successfully'
		},
		403: {
			content: { 'application/json': { schema: RecipeErrorSchema } },
			description: 'Forbidden'
		}
	}
});

export const likeRecipeRoute = createRoute({
	method: 'post',
	path: '/{id}/like',
	tags: ['Recipes'],
	summary: 'Like Recipe',
	description: 'Adds a like to the target recipe.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeActionResponseSchema }
			},
			description: 'Recipe liked successfully'
		}
	}
});

export const unlikeRecipeRoute = createRoute({
	method: 'delete',
	path: '/{id}/like',
	tags: ['Recipes'],
	summary: 'Unlike Recipe',
	description: 'Removes a like from the target recipe.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeActionResponseSchema }
			},
			description: 'Recipe unliked successfully'
		}
	}
});

export const favoriteRecipeRoute = createRoute({
	method: 'post',
	path: '/{id}/favorite',
	tags: ['Recipes'],
	summary: 'Favorite Recipe',
	description: 'Adds a recipe to the user favorites list.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeActionResponseSchema }
			},
			description: 'Recipe favorited successfully'
		}
	}
});

export const unfavoriteRecipeRoute = createRoute({
	method: 'delete',
	path: '/{id}/favorite',
	tags: ['Recipes'],
	summary: 'Unfavorite Recipe',
	description: 'Removes a recipe from the user favorites list.',
	request: { params: RecipeParamSchema },
	responses: {
		200: {
			content: {
				'application/json': { schema: RecipeActionResponseSchema }
			},
			description: 'Recipe unfavorited successfully'
		}
	}
});
