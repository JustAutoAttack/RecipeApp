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

export type MatchCondition = 'AND' | 'OR';

export type SortOption =
	| 'none'
	| 'alpha-asc'
	| 'alpha-desc'
	| 'duration-asc'
	| 'duration-desc';
