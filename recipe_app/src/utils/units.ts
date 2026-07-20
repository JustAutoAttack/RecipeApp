import { MeasurementSystem, UnitValue } from '../types';

interface UnitDef {
	value: UnitValue;
	label: string;
	shortLabel: string;
	system: MeasurementSystem | 'universal';
	type: 'weight' | 'volume' | 'count';
	toBase: number; // multiplier to convert 1 unit -> base unit for its type
}

// Base units: grams (weight), milliliters (volume). Count units don't convert.
export const UNIT_DEFINITIONS: UnitDef[] = [
	{
		value: 'g',
		label: 'grams',
		shortLabel: 'g',
		system: 'metric',
		type: 'weight',
		toBase: 1
	},
	{
		value: 'kg',
		label: 'kilograms',
		shortLabel: 'kg',
		system: 'metric',
		type: 'weight',
		toBase: 1000
	},
	{
		value: 'oz',
		label: 'ounces',
		shortLabel: 'oz',
		system: 'imperial',
		type: 'weight',
		toBase: 28.3495
	},
	{
		value: 'lb',
		label: 'pounds',
		shortLabel: 'lb',
		system: 'imperial',
		type: 'weight',
		toBase: 453.592
	},
	{
		value: 'ml',
		label: 'milliliters',
		shortLabel: 'ml',
		system: 'metric',
		type: 'volume',
		toBase: 1
	},
	{
		value: 'l',
		label: 'liters',
		shortLabel: 'l',
		system: 'metric',
		type: 'volume',
		toBase: 1000
	},
	{
		value: 'tsp',
		label: 'teaspoons',
		shortLabel: 'tsp',
		system: 'imperial',
		type: 'volume',
		toBase: 4.92892
	},
	{
		value: 'tbsp',
		label: 'tablespoons',
		shortLabel: 'tbsp',
		system: 'imperial',
		type: 'volume',
		toBase: 14.7868
	},
	{
		value: 'cup',
		label: 'cups',
		shortLabel: 'cup',
		system: 'imperial',
		type: 'volume',
		toBase: 236.588
	},
	{
		value: 'fl_oz',
		label: 'fluid ounces',
		shortLabel: 'fl oz',
		system: 'imperial',
		type: 'volume',
		toBase: 29.5735
	},
	{
		value: 'whole',
		label: 'whole',
		shortLabel: '',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'clove',
		label: 'cloves',
		shortLabel: 'clove(s)',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'slice',
		label: 'slices',
		shortLabel: 'slice(s)',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'pinch',
		label: 'pinch',
		shortLabel: 'pinch',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'can',
		label: 'cans',
		shortLabel: 'can(s)',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'package',
		label: 'packages',
		shortLabel: 'pkg',
		system: 'universal',
		type: 'count',
		toBase: 1
	},
	{
		value: 'leaf',
		label: 'leaves',
		shortLabel: 'leaf/leaves',
		system: 'universal',
		type: 'count',
		toBase: 1
	}
];

export const getUnitDef = (unit: UnitValue) =>
	UNIT_DEFINITIONS.find((u) => u.value === unit);

/** Units to show in a dropdown for the given preferred system (plus universal count units). */
export const getSelectableUnits = (system: MeasurementSystem) =>
	UNIT_DEFINITIONS.filter(
		(u) => u.system === system || u.system === 'universal'
	);

const pickBestUnit = (
	baseAmount: number,
	type: 'weight' | 'volume',
	system: MeasurementSystem
) => {
	const candidates = UNIT_DEFINITIONS.filter(
		(u) => u.type === type && u.system === system
	);
	const sorted = [...candidates].sort((a, b) => b.toBase - a.toBase);
	return (
		sorted.find((u) => baseAmount / u.toBase >= 1) ??
		sorted[sorted.length - 1]
	);
};

export interface DisplayAmount {
	amount: number;
	unit: UnitValue;
	label: string;
}

/** Converts a stored amount+unit into the preferred display system, picking a readable unit. */
export const convertForDisplay = (
	amount: number,
	unit: UnitValue,
	preferredSystem: MeasurementSystem
): DisplayAmount => {
	const def = getUnitDef(unit);
	if (!def || def.type === 'count' || def.system === preferredSystem) {
		return { amount, unit, label: def?.shortLabel ?? unit };
	}

	const baseAmount = amount * def.toBase;
	const target = pickBestUnit(baseAmount, def.type, preferredSystem);
	const converted = baseAmount / target.toBase;

	return {
		amount: Math.round(converted * 100) / 100,
		unit: target.value,
		label: target.shortLabel
	};
};
