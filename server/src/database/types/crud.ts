import { recipes, sessions, users } from '../schema';

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type RecipeSelect = typeof recipes.$inferSelect;
export type RecipeInsert = typeof recipes.$inferInsert;
export type SessionSelect = typeof sessions.$inferSelect;
export type SessionInsrt = typeof sessions.$inferInsert;
