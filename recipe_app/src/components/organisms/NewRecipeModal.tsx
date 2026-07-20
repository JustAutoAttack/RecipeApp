import { useState } from 'react';
import { X } from 'lucide-react';

import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (data: {
		title: string;
		cuisine: string[];
		cook_time_minutes: number;
	}) => void;
}

export const NewRecipeModal = ({ isOpen, onClose, onCreate }: Props) => {
	const [title, setTitle] = useState('');
	const [cuisineInput, setCuisineInput] = useState('');
	const [cookTime, setCookTime] = useState('30');

	if (!isOpen) return null;

	const reset = () => {
		setTitle('');
		setCuisineInput('');
		setCookTime('30');
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		const cuisine = cuisineInput
			.split(',')
			.map((c) => c.trim())
			.filter(Boolean);

		onCreate({
			title: title.trim(),
			cuisine,
			cook_time_minutes: Math.max(1, Number(cookTime) || 1)
		});

		reset();
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
			onClick={handleClose}
		>
			<div
				className='bg-bg rounded-xl shadow-lg max-w-md w-full'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex items-center justify-between px-5 py-4 border-b border-border'>
					<h2 className='font-semibold text-text'>New Recipe</h2>
					<button
						onClick={handleClose}
						className='p-1 rounded-lg text-text-secondary hover:bg-bg-hover'
					>
						<X className='w-4 h-4' />
					</button>
				</div>

				<form
					onSubmit={handleSubmit}
					className='px-5 py-4 space-y-4'
				>
					<Input
						label='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Weeknight Garlic Butter Pasta'
						autoFocus
					/>
					<Input
						label='Cuisine (comma-separated)'
						value={cuisineInput}
						onChange={(e) => setCuisineInput(e.target.value)}
						placeholder='Italian, Quick'
					/>
					<Input
						label='Cook time (minutes)'
						type='number'
						min={1}
						value={cookTime}
						onChange={(e) => setCookTime(e.target.value)}
					/>

					<div className='flex justify-end gap-2 pt-2'>
						<Button
							type='button'
							variant='ghost'
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='primary'
						>
							Create
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
