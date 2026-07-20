import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Check, X } from 'lucide-react';

import { CuisineMode, SortOption } from '../../types';

interface Props {
	cuisines: string[];
	selectedCuisines: string[];
	cuisineMode: CuisineMode;
	sortBy: SortOption;
	onToggleCuisine: (cuisine: string) => void;
	onCuisineModeChange: (mode: CuisineMode) => void;
	onClearCuisines: () => void;
	onSortChange: (sort: SortOption) => void;
}

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

	// Close the dropdown on outside click
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
			<div
				ref={containerRef}
				className='relative'
			>
				{/* Search input */}
				<div className='relative'>
					<Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary' />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onFocus={() => setIsOpen(true)}
						placeholder='Filter by cuisine...'
						className='w-full max-w-xs pl-9 pr-8 py-2 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-text bg-white'
					/>
					{selectedCuisines.length > 0 && (
						<span className='absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full bg-accent text-white text-xs leading-none'>
							{selectedCuisines.length}
						</span>
					)}
				</div>

				{/* Dropdown */}
				{isOpen && (
					<div className='absolute top-full left-0 mt-1 w-full max-w-xs bg-white border border-border rounded-lg shadow-lg overflow-hidden'>
						{multipleSelected && (
							<div className='flex rounded-lg border border-border overflow-hidden text-xs font-medium m-2 w-fit'>
								<button
									onClick={() => onCuisineModeChange('OR')}
									className={`px-2.5 py-1 ${cuisineMode === 'OR' ? 'bg-accent text-white' : 'bg-white text-text-secondary'}`}
								>
									Match any
								</button>
								<button
									onClick={() => onCuisineModeChange('AND')}
									className={`px-2.5 py-1 ${cuisineMode === 'AND' ? 'bg-accent text-white' : 'bg-white text-text-secondary'}`}
								>
									Match all
								</button>
							</div>
						)}

						<div className='max-h-56 overflow-y-auto'>
							{filteredCuisines.length > 0 ? (
								filteredCuisines.map((c) => {
									const isSelected =
										selectedCuisines.includes(c);
									return (
										<button
											key={c}
											onClick={() => onToggleCuisine(c)}
											className='w-full flex items-center justify-between px-3 py-2 text-sm text-text hover:bg-bg-hover transition-colors'
										>
											{c}
											{isSelected && (
												<Check className='w-4 h-4 text-accent' />
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

			{/* Selected chips */}
			{selectedCuisines.length > 0 && (
				<div className='flex items-center gap-2 flex-wrap'>
					{selectedCuisines.map((c) => (
						<span
							key={c}
							className='flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full text-xs font-medium bg-blue-50 text-accent'
						>
							{c}
							<button
								onClick={() => onToggleCuisine(c)}
								aria-label={`Remove ${c} filter`}
								className='p-0.5 rounded-full hover:bg-blue-100'
							>
								<X className='w-3 h-3' />
							</button>
						</span>
					))}
					<button
						onClick={onClearCuisines}
						className='text-xs text-text-secondary hover:text-text'
					>
						Clear all
					</button>
				</div>
			)}

			{/* Sort */}
			<div className='flex items-center gap-2'>
				<label className='text-xs text-text-secondary font-medium'>
					Sort
				</label>
				<select
					value={sortBy}
					onChange={(e) => onSortChange(e.target.value as SortOption)}
					className='text-sm border border-border rounded-lg px-2 py-1 bg-white text-text'
				>
					<option value='none'>Default</option>
					<option value='alpha-asc'>Name (A–Z)</option>
					<option value='alpha-desc'>Name (Z–A)</option>
					<option value='duration-asc'>Time (shortest first)</option>
					<option value='duration-desc'>Time (longest first)</option>
				</select>
			</div>
		</div>
	);
};
