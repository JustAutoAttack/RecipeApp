import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const groceryListsRouter = new OpenAPIHono();

groceryListsRouter.openapi(
	routes.listGroceryListsRoute,
	controller.handleListGroceryLists
);
groceryListsRouter.openapi(
	routes.createGroceryListRoute,
	controller.handleCreateGroceryList
);
groceryListsRouter.openapi(
	routes.getGroceryListByIdRoute,
	controller.handleGetGroceryListById
);
groceryListsRouter.openapi(
	routes.addGroceryItemRoute,
	controller.handleAddGroceryItem
);
groceryListsRouter.openapi(
	routes.updateGroceryItemRoute,
	controller.handleUpdateGroceryItem
);
groceryListsRouter.openapi(
	routes.deleteGroceryItemRoute,
	controller.handleDeleteGroceryItem
);
