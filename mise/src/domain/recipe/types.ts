import { UnitValue } from '../../core';

export interface Ingredient {
	id: string;
	name: string;
	brand?: string;
	amount: number;
	unit: UnitValue;
}

export interface Recipe {
	id: string;
	owner_id: string;
	title: string;
	cuisine: string[];
	image_url?: string;
	images?: string[];
	favorite?: boolean;
	cook_time_minutes: number;
	description?: string;
	history?: string;
	substitutions?: string;
	allergens: string[];
	ingredients: Ingredient[];
	instructions: string[];
	created_at: string;
	updated_at?: string;
}

export type RecipeFormData = Omit<
	Recipe,
	'id' | 'owner_id' | 'created_at' | 'updated_at' | 'favorite'
>;
