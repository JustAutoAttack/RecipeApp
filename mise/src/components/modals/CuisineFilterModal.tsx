import { useState, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';

import { CuisineMode } from '../../types';

interface Props {
	isOpen: boolean;
	cuisines: string[];
	selected: string[];
	mode: CuisineMode;
	onToggle: (cuisine: string) => void;
	onModeChange: (mode: CuisineMode) => void;
	onClear: () => void;
	onClose: () => void;
}

export const CuisineFilterModal = ({
	isOpen,
	cuisines,
	selected,
	mode,
	onToggle,
	onModeChange,
	onClear,
	onClose
}: Props) => {
	const [query, setQuery] = useState('');

	const filtered = useMemo(
		() =>
			cuisines.filter((c) =>
				c.toLowerCase().includes(query.trim().toLowerCase())
			),
		[cuisines, query]
	);

	const multipleSelected = selected.length >= 2;
    
	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
			onClick={onClose}
		>
			<div
				className='bg-bg rounded-xl shadow-lg max-w-sm w-full max-h-[70vh] flex flex-col'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex items-center justify-between px-5 py-4 border-b border-border shrink-0'>
					<h2 className='font-semibold text-text'>
						Filter by cuisine
					</h2>
					<button
						onClick={onClose}
						className='p-1 rounded-lg text-text-secondary hover:bg-bg-hover'
					>
						<X className='w-4 h-4' />
					</button>
				</div>

				<div className='px-5 py-3 border-b border-border shrink-0 space-y-3'>
					<div className='relative'>
						<Search className='w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary' />
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search cuisines...'
							autoFocus
							className='w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-text bg-bg'
						/>
					</div>

					<div
						className={`flex rounded-lg border border-border overflow-hidden text-xs font-medium w-fit transition-opacity ${
							multipleSelected
								? 'opacity-100'
								: 'opacity-40 pointer-events-none'
						}`}
					>
						<button
							onClick={() => onModeChange('OR')}
							className={`px-3 py-1.5 ${mode === 'OR' ? 'bg-accent text-white' : 'bg-bg text-text-secondary'}`}
						>
							Match any (OR)
						</button>
						<button
							onClick={() => onModeChange('AND')}
							className={`px-3 py-1.5 ${mode === 'AND' ? 'bg-accent text-white' : 'bg-bg text-text-secondary'}`}
						>
							Match all (AND)
						</button>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto py-2'>
					{filtered.length > 0 ? (
						filtered.map((c) => {
							const isSelected = selected.includes(c);
							return (
								<button
									key={c}
									onClick={() => onToggle(c)}
									className='w-full flex items-center justify-between px-5 py-2 text-sm text-text hover:bg-bg-hover transition-colors'
								>
									{c}
									{isSelected && (
										<Check className='w-4 h-4 text-accent' />
									)}
								</button>
							);
						})
					) : (
						<p className='px-5 py-4 text-sm text-text-secondary'>
							No cuisines match "{query}".
						</p>
					)}
				</div>

				<div className='flex items-center justify-between px-5 py-3 border-t border-border shrink-0'>
					<button
						onClick={onClear}
						disabled={selected.length === 0}
						className='text-sm text-text-secondary hover:text-text disabled:opacity-40 transition-colors'
					>
						Clear all
					</button>
					<button
						onClick={onClose}
						className='px-4 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors'
					>
						Done ({selected.length})
					</button>
				</div>
			</div>
		</div>
	);
};
