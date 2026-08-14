import { sqliteTable, sqliteView, text, integer, real, blob, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password_hash: text('password_hash').notNull(),
  display_name: text('display_name').notNull(),
  theme: text('theme').notNull().default('system'),
  allergens: text('allergens'),
  pantry_tracking_enabled: integer('pantry_tracking_enabled').notNull().default(1),
  last_connection_date: text('last_connection_date'),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().notNull(),
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token').notNull(),
  expires_at: text('expires_at').notNull(),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tier: text('tier').notNull().default('free'),
  activity_status: text('activity_status').notNull().default('active'),
  stripe_customer_id: text('stripe_customer_id'),
  stripe_subscription_id: text('stripe_subscription_id'),
  current_period_end: text('current_period_end'),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const recipes = sqliteTable('recipes', {
  id: text('id').primaryKey().notNull(),
  owner_id: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  cuisine: text('cuisine').notNull(),
  cook_time_minutes: integer('cook_time_minutes').notNull(),
  ingredients: text('ingredients').notNull(),
  instructions: text('instructions').notNull(),
  description: text('description'),
  history: text('history'),
  substitutions: text('substitutions'),
  allergens: text('allergens'),
  image_url: text('image_url'),
  images: text('images'),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const favorited_recipes = sqliteTable('favorited_recipes', {
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recipe_id: text('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  created_at: text('created_at').notNull(),
}, (table) => [
  primaryKey({ columns: [table.user_id, table.recipe_id] })
]);

export const liked_recipes = sqliteTable('liked_recipes', {
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recipe_id: text('recipe_id').notNull().references(() => recipes.id, { onDelete: 'cascade' }),
  created_at: text('created_at').notNull(),
}, (table) => [
  primaryKey({ columns: [table.user_id, table.recipe_id] })
]);

export const followed_users = sqliteTable('followed_users', {
  user_id: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followed_user_id: text('followed_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  created_at: text('created_at').notNull(),
}, (table) => [
  primaryKey({ columns: [table.user_id, table.followed_user_id] })
]);

export const pantries = sqliteTable('pantries', {
  id: text('id').primaryKey().notNull(),
  owner_id: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  ingredients: text('ingredients').notNull(),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const grocery_lists = sqliteTable('grocery_lists', {
  id: text('id').primaryKey().notNull(),
  owner_id: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull().default('My Grocery List'),
  items: text('items').notNull(),
  updated_at: text('updated_at').notNull(),
  created_at: text('created_at').notNull(),
});

export const full_recipe_view = sqliteView('full_recipe_view', {
  id: text('id'),
  owner_id: text('owner_id'),
  title: text('title'),
  cuisine: text('cuisine'),
  cook_time_minutes: integer('cook_time_minutes'),
  ingredients: text('ingredients'),
  instructions: text('instructions'),
  description: text('description'),
  history: text('history'),
  substitutions: text('substitutions'),
  allergens: text('allergens'),
  image_url: text('image_url'),
  images: text('images'),
  updated_at: text('updated_at'),
  created_at: text('created_at'),
  likes_count: integer('likes_count'),
  favorites_count: integer('favorites_count'),
}).existing();

export const public_full_user_view = sqliteView('public_full_user_view', {
  id: text('id'),
  username: text('username'),
  display_name: text('display_name'),
  theme: text('theme'),
  allergens: text('allergens'),
  last_connection_date: text('last_connection_date'),
  updated_at: text('updated_at'),
  created_at: text('created_at'),
  subscription_tier: text('subscription_tier'),
  subscription_status: text('subscription_status'),
  recipe_count: integer('recipe_count'),
  total_likes_received: integer('total_likes_received'),
  total_favorites_received: integer('total_favorites_received'),
  follower_count: integer('follower_count'),
  following_count: integer('following_count'),
}).existing();

