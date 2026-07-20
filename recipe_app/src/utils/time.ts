export function formatCookTime(minutesInput: number): string {
	const minutes = Math.max(1, Math.round(minutesInput));

	const units = [
		{ limit: 60, divisor: 1, label: 'minute' },
		{ limit: 1440, divisor: 60, label: 'hour' },
		{ limit: 10080, divisor: 1440, label: 'day' },
		{ limit: Infinity, divisor: 10080, label: 'week' }
	];

	const unit =
		units.find((u) => minutes < u.limit) ?? units[units.length - 1];
	const value = Math.round((minutes / unit.divisor) * 2) / 2; // nearest 0.5
	const label = value === 1 ? unit.label : `${unit.label}s`;

	return `${value} ${label}`;
}
