export type MeasurementSystem = 'metric' | 'imperial';

export type UnitValue =
	| 'g'
	| 'kg'
	| 'oz'
	| 'lb'
	| 'ml'
	| 'l'
	| 'tsp'
	| 'tbsp'
	| 'cup'
	| 'fl_oz'
	| 'whole'
	| 'clove'
	| 'slice'
	| 'pinch'
	| 'can'
	| 'package'
	| 'leaf';

export interface Ingredient {
	id: string;
	name: string;
	brand?: string;
	amount: number;
	unit: UnitValue;
}

export interface Recipe {
	id: string;
	title: string;
	cuisine: string[];
	image_url?: string;
	images?: string[];
	favorite: boolean;
	cook_time_minutes: number;
	description?: string;
	history?: string;
	substitutions?: string;
	allergens?: string[];
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
