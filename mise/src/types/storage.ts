export interface UserRow {
	id: string;
	username: string;
	created_at: string;
}

export interface RecipeRow {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string; // JSON array string from SQLite
	cook_time_minutes: number;
	ingredients: string; // JSON array string
	instructions: string; // JSON array string
	description?: string;
	history?: string;
	substitutions?: string;
	allergens?: string; // JSON array or CSV string
	image_url?: string;
	images?: string; // JSON array string
	created_at: string;
}

export interface AuthResponse {
	user: UserRow;
	token: string;
}
