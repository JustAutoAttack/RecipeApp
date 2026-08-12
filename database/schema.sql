CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    theme TEXT NOT NULL DEFAULT 'system',
    -- JSON array of allergens
    allergens TEXT,
    -- Boolean flag (0 or 1)
    pantry_tracking_enabled INTEGER NOT NULL DEFAULT 1,
    last_connection_date TEXT,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    -- JWT
    access_token TEXT UNIQUE NOT NULL,
    -- JWT
    refresh_token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT UNIQUE NOT NULL,
    -- 'free' | 'pro'
    tier TEXT NOT NULL DEFAULT 'free',
    -- 'active' | 'past_due' | 'canceled'
    activity_status TEXT NOT NULL DEFAULT 'active',
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    current_period_end TEXT,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY NOT NULL,
    owner_id TEXT NOT NULL,
    title TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    cook_time_minutes INTEGER NOT NULL,
    -- JSON array mapped to ingredient models
    ingredients TEXT NOT NULL,
    -- JSON array mapped to step models
    instructions TEXT NOT NULL,
    description TEXT,
    history TEXT,
    -- JSON array mapped to substitution models
    substitutions TEXT,
    -- JSON array of recipe allergens
    allergens TEXT,
    image_url TEXT,
    -- JSON array of image URL texts
    images TEXT,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
    user_id TEXT NOT NULL,
    recipe_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    user_id TEXT NOT NULL,
    recipe_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pantry (
    id TEXT PRIMARY KEY NOT NULL,
    owner_id TEXT UNIQUE NOT NULL,
    -- JSON array mapped to ingredient models
    ingredients TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS grocery_lists (
    id TEXT PRIMARY KEY NOT NULL,
    owner_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT 'My Grocery List',
    -- JSON array mapped to grocery item models
    items TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE VIEW IF NOT EXISTS full_recipe_view AS
SELECT recipes.id,
    recipes.owner_id,
    recipes.title,
    recipes.cuisine,
    recipes.cook_time_minutes,
    recipes.ingredients,
    recipes.instructions,
    recipes.description,
    recipes.history,
    recipes.substitutions,
    recipes.allergens,
    recipes.image_url,
    recipes.images,
    recipes.updated_at,
    recipes.created_at,
    COALESCE(likes_row.likes_count, 0) AS likes_count,
    COALESCE(favorites_row.favorites_count, 0) AS favorites_count
FROM recipes
    LEFT JOIN (
        SELECT recipe_id,
            COUNT(*) AS likes_count
        FROM likes
        GROUP BY recipe_id
    ) AS likes_row ON recipes.id = likes_row.recipe_id
    LEFT JOIN (
        SELECT recipe_id,
            COUNT(*) AS favorites_count
        FROM favorites
        GROUP BY recipe_id
    ) AS favorites_row ON recipes.id = favorites_row.recipe_id;

CREATE VIEW IF NOT EXISTS public_full_user_view AS
SELECT users.id,
    users.username,
    users.display_name,
    users.theme,
    users.allergens,
    users.last_connection_date,
    users.updated_at,
    users.created_at,
    COALESCE(subscriptions.tier, 'free') AS subscription_tier,
    COALESCE(subscriptions.activity_status, 'active') AS subscription_status,
    COALESCE(recipe_stats.recipe_count, 0) AS recipe_count,
    COALESCE(like_stats.total_likes_received, 0) AS total_likes_received
FROM users
    LEFT JOIN subscriptions ON users.id = subscriptions.user_id
    LEFT JOIN (
        SELECT owner_id,
            COUNT(*) AS recipe_count
        FROM recipes
        GROUP BY owner_id
    ) AS recipe_stats ON users.id = recipe_stats.owner_id
    LEFT JOIN (
        SELECT recipes.owner_id,
            COUNT(likes.recipe_id) AS total_likes_received
        FROM recipes
            JOIN likes ON recipes.id = likes.recipe_id
        GROUP BY recipes.owner_id
    ) AS like_stats ON users.id = like_stats.owner_id;