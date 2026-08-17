import { UnitValue } from '../common';

export interface Ingredient {
	id: string;
	name: string;
	brand?: string;
	amount: number;
	unit: UnitValue;
}

export interface GroceryItem {}
