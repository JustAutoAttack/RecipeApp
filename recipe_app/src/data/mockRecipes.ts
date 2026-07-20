import { Recipe } from '../types';

const daysAgo = (n: number) => {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d.toISOString();
};

export const mockRecipes: Recipe[] = [
	{
		id: '1',
		title: 'Weeknight Garlic Butter Pasta',
		cuisine: ['Italian', 'Quick'],
		favorite: true,
		cook_time_minutes: 20,
		ingredients: [
			{ id: 'i1', name: 'Spaghetti', amount: 200, unit: 'g' },
			{ id: 'i2', name: 'Butter', amount: 2, unit: 'tbsp' },
			{ id: 'i3', name: 'Garlic cloves', amount: 3, unit: '' }
		],
		instructions: [
			'Boil the pasta until al dente.',
			'Melt butter and sauté garlic until fragrant.',
			'Toss pasta in the garlic butter and serve.'
		],
		created_at: daysAgo(0),
		updated_at: daysAgo(0)
	},
	{
		id: '2',
		title: 'Simple Miso Soup',
		cuisine: ['Japanese'],
		favorite: false,
		cook_time_minutes: 15,
		ingredients: [
			{ id: 'i1', name: 'Dashi stock', amount: 500, unit: 'ml' },
			{ id: 'i2', name: 'Miso paste', amount: 2, unit: 'tbsp' },
			{ id: 'i3', name: 'Tofu', amount: 100, unit: 'g' }
		],
		instructions: [
			'Heat the dashi stock until just below boiling.',
			'Whisk in the miso paste.',
			'Add cubed tofu and simmer for two minutes.'
		],
		created_at: daysAgo(1),
		updated_at: daysAgo(1)
	},
	{
		id: '3',
		title: 'Classic Beef Tacos',
		cuisine: ['Mexican', 'Quick'],
		favorite: true,
		cook_time_minutes: 30,
		ingredients: [
			{ id: 'i1', name: 'Ground beef', amount: 500, unit: 'g' },
			{ id: 'i2', name: 'Taco shells', amount: 8, unit: '' },
			{ id: 'i3', name: 'Cheddar cheese', amount: 100, unit: 'g' }
		],
		instructions: [
			'Brown the beef with taco seasoning.',
			'Warm the taco shells.',
			'Assemble with beef, cheese, and toppings.'
		],
		created_at: daysAgo(2),
		updated_at: daysAgo(2)
	},
	{
		id: '4',
		title: 'Butter Chicken',
		cuisine: ['Indian'],
		favorite: false,
		cook_time_minutes: 90,
		ingredients: [
			{ id: 'i1', name: 'Chicken thighs', amount: 600, unit: 'g' },
			{ id: 'i2', name: 'Tomato puree', amount: 400, unit: 'ml' },
			{ id: 'i3', name: 'Heavy cream', amount: 100, unit: 'ml' }
		],
		instructions: [
			'Marinate and sear the chicken.',
			'Simmer in tomato puree and spices.',
			'Stir in cream and finish cooking.'
		],
		created_at: daysAgo(3),
		updated_at: daysAgo(3)
	},
	{
		id: '5',
		title: 'Classic Margherita Pizza',
		cuisine: ['Italian'],
		favorite: true,
		cook_time_minutes: 45,
		ingredients: [
			{ id: 'i1', name: 'Pizza dough', amount: 1, unit: '' },
			{ id: 'i2', name: 'Mozzarella', amount: 150, unit: 'g' },
			{ id: 'i3', name: 'Fresh basil', amount: 10, unit: '' }
		],
		instructions: [
			'Stretch the dough onto a tray.',
			'Top with sauce, mozzarella, and basil.',
			'Bake at high heat until charred.'
		],
		created_at: daysAgo(4),
		updated_at: daysAgo(4)
	},
	{
		id: '6',
		title: 'Thai Green Curry',
		cuisine: ['Thai'],
		favorite: false,
		cook_time_minutes: 40,
		ingredients: [
			{ id: 'i1', name: 'Green curry paste', amount: 3, unit: 'tbsp' },
			{ id: 'i2', name: 'Coconut milk', amount: 400, unit: 'ml' },
			{ id: 'i3', name: 'Chicken breast', amount: 400, unit: 'g' }
		],
		instructions: [
			'Fry the curry paste until fragrant.',
			'Add coconut milk and chicken, simmer.',
			'Finish with fish sauce and basil.'
		],
		created_at: daysAgo(5),
		updated_at: daysAgo(5)
	},
	{
		id: '7',
		title: 'French Onion Soup',
		cuisine: ['French'],
		favorite: false,
		cook_time_minutes: 120,
		ingredients: [
			{ id: 'i1', name: 'Yellow onions', amount: 6, unit: '' },
			{ id: 'i2', name: 'Beef stock', amount: 1, unit: 'l' },
			{ id: 'i3', name: 'Gruyère cheese', amount: 150, unit: 'g' }
		],
		instructions: [
			'Slowly caramelize the onions.',
			'Add stock and simmer.',
			'Top with bread and cheese, broil.'
		],
		created_at: daysAgo(6),
		updated_at: daysAgo(6)
	},
	{
		id: '8',
		title: 'Korean Bibimbap',
		cuisine: ['Korean'],
		favorite: true,
		cook_time_minutes: 35,
		ingredients: [
			{ id: 'i1', name: 'Cooked rice', amount: 2, unit: 'cup' },
			{ id: 'i2', name: 'Mixed vegetables', amount: 300, unit: 'g' },
			{ id: 'i3', name: 'Gochujang', amount: 2, unit: 'tbsp' }
		],
		instructions: [
			'Prepare rice and vegetables separately.',
			'Arrange over rice in a bowl.',
			'Top with a fried egg and gochujang.'
		],
		created_at: daysAgo(7),
		updated_at: daysAgo(7)
	},
	{
		id: '9',
		title: '3-Day Fermented Kimchi',
		cuisine: ['Korean', 'Fermented'],
		favorite: false,
		cook_time_minutes: 4320, // 3 days
		ingredients: [
			{ id: 'i1', name: 'Napa cabbage', amount: 1, unit: '' },
			{ id: 'i2', name: 'Gochugaru', amount: 4, unit: 'tbsp' },
			{ id: 'i3', name: 'Fish sauce', amount: 3, unit: 'tbsp' }
		],
		instructions: [
			'Salt and rinse the cabbage.',
			'Mix the seasoning paste and coat the cabbage.',
			'Pack into a jar and ferment at room temp for 3 days.'
		],
		created_at: daysAgo(8),
		updated_at: daysAgo(8)
	},
	{
		id: '10',
		title: 'Slow-Cured Country Ham',
		cuisine: ['American', 'Cured'],
		favorite: false,
		cook_time_minutes: 20160, // 2 weeks
		ingredients: [
			{ id: 'i1', name: 'Pork leg', amount: 1, unit: '' },
			{ id: 'i2', name: 'Curing salt', amount: 200, unit: 'g' },
			{ id: 'i3', name: 'Brown sugar', amount: 100, unit: 'g' }
		],
		instructions: [
			'Coat the pork leg in the cure mix.',
			'Refrigerate, turning weekly, for 2 weeks.',
			'Rinse and hang to dry before cooking.'
		],
		created_at: daysAgo(9),
		updated_at: daysAgo(9)
	}
];
