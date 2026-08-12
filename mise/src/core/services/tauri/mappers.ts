import { User, UserRow } from '@user';
import { Recipe, RecipeFormData, RecipeRow } from '@recipes';
import { Ingredient } from '../../types';

export const parseRecipeRow = (row: RecipeRow): Recipe => {
	let cuisine: string[] = [];
	try {
		cuisine =
			typeof row.cuisine === 'string'
				? JSON.parse(row.cuisine)
				: row.cuisine || [];
	} catch {
		cuisine = [];
	}

	let ingredients: Ingredient[] = [];
	try {
		ingredients =
			typeof row.ingredients === 'string'
				? JSON.parse(row.ingredients)
				: row.ingredients || [];
	} catch {
		ingredients = [];
	}

	let instructions: string[] = [];
	try {
		instructions =
			typeof row.instructions === 'string'
				? JSON.parse(row.instructions)
				: row.instructions || [];
	} catch {
		instructions = [];
	}

	let images: string[] = [];
	try {
		images =
			typeof row.images === 'string'
				? JSON.parse(row.images)
				: row.images || [];
	} catch {
		images = [];
	}

	let allergens: string[] = [];
	if (typeof row.allergens === 'string') {
		allergens = row.allergens.includes('[')
			? JSON.parse(row.allergens)
			: row.allergens
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean);
	} else if (Array.isArray(row.allergens)) {
		allergens = row.allergens;
	}

	return {
		id: row.id,
		owner_id: row.owner_id,
		title: row.title,
		cuisine,
		cook_time_minutes: row.cook_time_minutes,
		ingredients,
		instructions,
		description: row.description,
		history: row.history,
		substitutions: row.substitutions,
		allergens,
		image_url: row.image_url,
		images,
		created_at: row.created_at
	};
};

export const serializeRecipeForm = (
	id: string,
	ownerId: string,
	data: RecipeFormData,
	createdAt: string
): RecipeRow => ({
	id,
	owner_id: ownerId,
	title: data.title,
	cuisine: JSON.stringify(data.cuisine),
	cook_time_minutes: data.cook_time_minutes,
	ingredients: JSON.stringify(data.ingredients),
	instructions: JSON.stringify(data.instructions),
	description: data.description || undefined,
	history: data.history || undefined,
	substitutions: data.substitutions || undefined,
	allergens:
		(data.allergens ?? []).length > 0
			? JSON.stringify(data.allergens)
			: undefined,
	image_url: data.image_url || undefined,
	images:
		(data.images ?? []).length > 0
			? JSON.stringify(data.images)
			: undefined,
	created_at: createdAt
});

export const parseUserRow = (row: UserRow): User => ({
	id: row.id,
	username: row.username,
	created_at: row.created_at
});
