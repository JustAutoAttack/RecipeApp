export interface Ingredient {
	id: string;
	name: string;
	brand?: string;
	amount: number;
	unit: string;
}

export interface Recipe {
	id: string;
	title: string;
	cuisine: string[];
	image_url?: string;
	favorite: boolean;
	cook_time_minutes: number;
	ingredients: Ingredient[];
	instructions: string[];
	created_at: string;
	updated_at: string;
}

export type CuisineMode = 'AND' | 'OR';
export type SortOption =
	| 'none'
	| 'alpha-asc'
	| 'alpha-desc'
	| 'duration-asc'
	| 'duration-desc';
