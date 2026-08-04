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
		image_url: '/assets/recipes/garlic-butter-pasta-hero.jpg',
		images: [
			'/assets/recipes/garlic-butter-pasta-close-up.jpg',
			'/assets/recipes/garlic-butter-pasta-ingredients.jpg'
		],
		favorite: true,
		cook_time_minutes: 20,
		description:
			'A fast, fragrant weeknight pasta built entirely around garlic and butter.',
		history:
			'A home-cook staple rather than a regional dish — the aglio e olio family of Italian pastas is its closest ancestor.',
		substitutions:
			'Swap butter for olive oil to make it dairy-free. Nutritional yeast can stand in for parmesan.',
		allergens: ['Dairy', 'Gluten'],
		ingredients: [
			{ id: 'i1', name: 'Spaghetti', amount: 200, unit: 'g' },
			{ id: 'i2', name: 'Butter', amount: 2, unit: 'tbsp' },
			{ id: 'i3', name: 'Garlic cloves', amount: 3, unit: 'clove' }
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
		image_url: '/assets/recipes/miso-soup-bowl.jpg',
		favorite: false,
		cook_time_minutes: 15,
		description:
			'A light, savory soup built on dashi and miso — ready in minutes.',
		history:
			'A daily staple in Japanese households, traditionally served alongside rice at breakfast.',
		substitutions:
			'Use vegetable stock instead of dashi for a vegetarian version.',
		allergens: ['Soy'],
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
		image_url: '/assets/recipes/beef-tacos-platter.jpg',
		images: ['/assets/recipes/beef-tacos-assembly.jpg'],
		favorite: true,
		cook_time_minutes: 30,
		description:
			'Seasoned ground beef, warm shells, and all the classic toppings.',
		substitutions:
			'Ground turkey or a plant-based crumble both work well in place of beef.',
		allergens: ['Dairy', 'Gluten'],
		ingredients: [
			{ id: 'i1', name: 'Ground beef', amount: 500, unit: 'g' },
			{ id: 'i2', name: 'Taco shells', amount: 8, unit: 'whole' },
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
		image_url: '/assets/recipes/butter-chicken-curry.jpg',
		favorite: false,
		cook_time_minutes: 90,
		description:
			'Seared chicken simmered in a rich, spiced tomato-cream sauce.',
		history:
			'Said to have originated in Delhi in the 1950s at Moti Mahal, invented to use up leftover tandoori chicken in a buttery tomato gravy.',
		substitutions:
			'Coconut cream can replace heavy cream for a dairy-free version.',
		allergens: ['Dairy'],
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
		image_url: '/assets/recipes/margherita-pizza-top-down.jpg',
		images: [
			'/assets/recipes/margherita-pizza-slice.jpg',
			'/assets/recipes/margherita-pizza-oven.jpg'
		],
		favorite: true,
		cook_time_minutes: 45,
		description:
			'The original: dough, tomato, mozzarella, and basil, baked hot and fast.',
		history:
			'Popularly credited to Naples in 1889, made in the colors of the Italian flag in honor of Queen Margherita.',
		allergens: ['Dairy', 'Gluten'],
		ingredients: [
			{ id: 'i1', name: 'Pizza dough', amount: 1, unit: 'whole' },
			{ id: 'i2', name: 'Mozzarella', amount: 150, unit: 'g' },
			{ id: 'i3', name: 'Fresh basil', amount: 10, unit: 'leaf' }
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
		image_url: '/assets/recipes/thai-green-curry.jpg',
		favorite: false,
		cook_time_minutes: 40,
		description:
			'A fragrant, coconut-based curry balanced between heat and sweetness.',
		substitutions:
			'Swap chicken for tofu or shrimp; fish sauce can be replaced with soy sauce for a vegetarian version.',
		allergens: ['Shellfish', 'Fish'],
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
		image_url: '/assets/recipes/french-onion-soup-gratin.jpg',
		favorite: false,
		cook_time_minutes: 120,
		description:
			'Deeply caramelized onions in a rich broth, finished under a bubbling layer of cheese.',
		history:
			'Dates back to Roman times as a peasant dish, though the modern gratinée version became popular in 18th-century Paris.',
		allergens: ['Dairy', 'Gluten'],
		ingredients: [
			{ id: 'i1', name: 'Yellow onions', amount: 6, unit: 'whole' },
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
		image_url: '/assets/recipes/bibimbap-bowl.jpg',
		images: ['/assets/recipes/bibimbap-mix.jpg'],
		favorite: true,
		cook_time_minutes: 35,
		description:
			'A mixed rice bowl with seasoned vegetables, gochujang, and a fried egg.',
		substitutions:
			'Any seasonal vegetables work — this dish is traditionally built around whatever is on hand.',
		allergens: ['Eggs', 'Soy'],
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
		image_url: '/assets/recipes/kimchi-jar.jpg',
		favorite: false,
		cook_time_minutes: 4320,
		description:
			'Salted and seasoned napa cabbage, fermented at room temperature until tangy.',
		history:
			'Kimchi-making traces back over a thousand years in Korea, originally developed as a way to preserve vegetables through winter.',
		allergens: ['Fish'],
		ingredients: [
			{ id: 'i1', name: 'Napa cabbage', amount: 1, unit: 'whole' },
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
		image_url: '/assets/recipes/cured-ham-sliced.jpg',
		favorite: false,
		cook_time_minutes: 20160,
		description: 'A dry-cured whole ham, salted and rested over two weeks.',
		history:
			'Rooted in the American South, developed as a way to preserve pork before refrigeration was common.',
		ingredients: [
			{ id: 'i1', name: 'Pork leg', amount: 1, unit: 'whole' },
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
