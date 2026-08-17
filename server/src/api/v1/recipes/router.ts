import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const recipesRouter = new OpenAPIHono();

recipesRouter.openapi(routes.listRecipesRoute, controller.handleListRecipes);
recipesRouter.openapi(routes.createRecipeRoute, controller.handleCreateRecipe);
recipesRouter.openapi(
	routes.getRecipeByIdRoute,
	controller.handleGetRecipeById
);
recipesRouter.openapi(routes.updateRecipeRoute, controller.handleUpdateRecipe);
recipesRouter.openapi(routes.deleteRecipeRoute, controller.handleDeleteRecipe);
recipesRouter.openapi(routes.likeRecipeRoute, controller.handleLikeRecipe);
recipesRouter.openapi(routes.unlikeRecipeRoute, controller.handleUnlikeRecipe);
recipesRouter.openapi(
	routes.favoriteRecipeRoute,
	controller.handleFavoriteRecipe
);
recipesRouter.openapi(
	routes.unfavoriteRecipeRoute,
	controller.handleUnfavoriteRecipe
);
