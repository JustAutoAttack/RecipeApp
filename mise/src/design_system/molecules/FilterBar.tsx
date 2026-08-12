import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Check, X, ChevronDown } from 'lucide-react';

import { MatchCondition, SortOption } from '@core';

interface Props {
	cuisines: string[];
	selectedCuisines: string[];
	cuisineMode: MatchCondition;
	sortBy: SortOption;
	onToggleCuisine: (cuisine: string) => void;
	onCuisineModeChange: (mode: MatchCondition) => void;
	onClearCuisines: () => void;
	onSortChange: (sort: SortOption) => void;
}

// --- Subcomponents ---

interface CuisineSearchDropdownProps {
	query: string;
	setQuery: (q: string) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	containerRef: React.RefObject<HTMLDivElement | null>;
	selectedCuisines: string[];
	multipleSelected: boolean;
	cuisineMode: MatchCondition;
	onCuisineModeChange: (mode: MatchCondition) => void;
	filteredCuisines: string[];
	onToggleCuisine: (cuisine: string) => void;
}

const CuisineSearchDropdown = ({
	query,
	setQuery,
	isOpen,
	setIsOpen,
	containerRef,
	selectedCuisines,
	multipleSelected,
	cuisineMode,
	onCuisineModeChange,
	filteredCuisines,
	onToggleCuisine
}: CuisineSearchDropdownProps) => (
	<div
		ref={containerRef}
		className='relative flex-1 max-w-xs'
	>
		<div className='relative'>
			<Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary' />
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setIsOpen(true)}
				placeholder='Filter by cuisine...'
				className='w-full pl-9 pr-8 py-1.5 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-text bg-bg placeholder:text-text-secondary transition-colors'
			/>
			{selectedCuisines.length > 0 && (
				<span className='absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full bg-accent text-white text-xs leading-none'>
					{selectedCuisines.length}
				</span>
			)}
		</div>

		{isOpen && (
			<div className='absolute top-full left-0 mt-1 w-full bg-bg border border-border rounded-lg shadow-xl overflow-hidden z-20'>
				{multipleSelected && (
					<div className='flex rounded-lg border border-border overflow-hidden text-xs font-medium m-2 w-fit bg-bg-secondary'>
						<button
							type='button'
							onClick={() => onCuisineModeChange('OR')}
							className={`px-2.5 py-1 transition-colors ${
								cuisineMode === 'OR'
									? 'bg-accent text-white'
									: 'text-text-secondary hover:text-text hover:bg-bg-hover'
							}`}
						>
							Match any
						</button>
						<button
							type='button'
							onClick={() => onCuisineModeChange('AND')}
							className={`px-2.5 py-1 transition-colors ${
								cuisineMode === 'AND'
									? 'bg-accent text-white'
									: 'text-text-secondary hover:text-text hover:bg-bg-hover'
							}`}
						>
							Match all
						</button>
					</div>
				)}

				<div className='max-h-56 overflow-y-auto'>
					{filteredCuisines.length > 0 ? (
						filteredCuisines.map((c) => {
							const isSelected = selectedCuisines.includes(c);
							return (
								<button
									key={c}
									type='button'
									onClick={() => onToggleCuisine(c)}
									className='w-full flex items-center justify-between px-3 py-2 text-sm text-text hover:bg-bg-hover transition-colors text-left cursor-pointer'
								>
									<span>{c}</span>
									{isSelected && (
										<Check className='w-4 h-4 text-accent shrink-0' />
									)}
								</button>
							);
						})
					) : (
						<p className='px-3 py-3 text-sm text-text-secondary'>
							No cuisines match "{query}".
						</p>
					)}
				</div>
			</div>
		)}
	</div>
);

interface CustomSortDropdownProps {
	sortBy: SortOption;
	onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'none', label: 'Default' },
	{ value: 'alpha-asc', label: 'Name (A-Z)' },
	{ value: 'alpha-desc', label: 'Name (Z-A)' },
	{ value: 'duration-asc', label: 'Time (shortest first)' },
	{ value: 'duration-desc', label: 'Time (longest first)' }
];

const CustomSortDropdown = ({
	sortBy,
	onSortChange
}: CustomSortDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const currentLabel =
		SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || 'Default';

	return (
		<div
			ref={dropdownRef}
			className='relative shrink-0 flex items-center gap-2'
		>
			<label className='text-xs text-text-secondary font-medium'>
				Sort
			</label>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center justify-between gap-3 text-sm border border-border rounded-lg px-2.5 py-1.5 bg-bg-secondary text-text outline-none focus:ring-2 focus:ring-accent transition-colors cursor-pointer min-w-40'
			>
				<span className='truncate'>{currentLabel}</span>
				<ChevronDown className='w-4 h-4 text-text-secondary shrink-0' />
			</button>

			{isOpen && (
				<div className='absolute right-0 top-full mt-1 w-52 bg-bg border border-border rounded-lg shadow-xl overflow-hidden z-20 py-1'>
					{SORT_OPTIONS.map((option) => {
						const isSelected = sortBy === option.value;
						return (
							<button
								key={option.value}
								type='button'
								onClick={() => {
									onSortChange(option.value);
									setIsOpen(false);
								}}
								className='w-full flex items-center justify-between px-3 py-2 text-sm text-text hover:bg-bg-hover transition-colors text-left cursor-pointer'
							>
								<span
									className={
										isSelected
											? 'font-medium text-accent'
											: ''
									}
								>
									{option.label}
								</span>
								{isSelected && (
									<Check className='w-4 h-4 text-accent shrink-0' />
								)}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

interface SelectedCuisineBadgesProps {
	selectedCuisines: string[];
	onToggleCuisine: (cuisine: string) => void;
	onClearCuisines: () => void;
}

const SelectedCuisineBadges = ({
	selectedCuisines,
	onToggleCuisine,
	onClearCuisines
}: SelectedCuisineBadgesProps) => {
	if (selectedCuisines.length === 0) return null;

	return (
		<div className='flex items-center gap-2 flex-wrap'>
			{selectedCuisines.map((c) => (
				<span
					key={c}
					className='flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20'
				>
					{c}
					<button
						type='button'
						onClick={() => onToggleCuisine(c)}
						aria-label={`Remove ${c} filter`}
						className='p-0.5 rounded-full hover:bg-accent/25 transition-colors cursor-pointer'
					>
						<X className='w-3 h-3' />
					</button>
				</span>
			))}
			<button
				type='button'
				onClick={onClearCuisines}
				className='text-xs text-text-secondary hover:text-text transition-colors cursor-pointer'
			>
				Clear all
			</button>
		</div>
	);
};

// --- Main Container Component ---

export const FilterBar = ({
	cuisines,
	selectedCuisines,
	cuisineMode,
	sortBy,
	onToggleCuisine,
	onCuisineModeChange,
	onClearCuisines,
	onSortChange
}: Props) => {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const filteredCuisines = useMemo(
		() =>
			cuisines.filter((c) =>
				c.toLowerCase().includes(query.trim().toLowerCase())
			),
		[cuisines, query]
	);

	const multipleSelected = selectedCuisines.length >= 2;

	return (
		<div className='sticky top-0 z-10 bg-bg-secondary/95 backdrop-blur border-b border-border -mx-6 px-6 py-3 mb-6 space-y-3'>
			<div className='flex items-center justify-between gap-4'>
				<CuisineSearchDropdown
					query={query}
					setQuery={setQuery}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					containerRef={containerRef}
					selectedCuisines={selectedCuisines}
					multipleSelected={multipleSelected}
					cuisineMode={cuisineMode}
					onCuisineModeChange={onCuisineModeChange}
					filteredCuisines={filteredCuisines}
					onToggleCuisine={onToggleCuisine}
				/>
				<CustomSortDropdown
					sortBy={sortBy}
					onSortChange={onSortChange}
				/>
			</div>

			<SelectedCuisineBadges
				selectedCuisines={selectedCuisines}
				onToggleCuisine={onToggleCuisine}
				onClearCuisines={onClearCuisines}
			/>
		</div>
	);
};
