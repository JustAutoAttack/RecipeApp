import { OpenAPIHono } from '@hono/zod-openapi';

import * as controller from './controller';
import * as routes from './routes';

export const pantriesRouter = new OpenAPIHono();

pantriesRouter.openapi(routes.listPantryRoute, controller.handleListPantry);
pantriesRouter.openapi(
	routes.createPantryItemRoute,
	controller.handleCreatePantryItem
);
pantriesRouter.openapi(
	routes.updatePantryItemRoute,
	controller.handleUpdatePantryItem
);
pantriesRouter.openapi(
	routes.deletePantryItemRoute,
	controller.handleDeletePantryItem
);
