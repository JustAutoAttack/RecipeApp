import { useState } from 'react';
import { X, Plus } from 'lucide-react';

import { COMMON_ALLERGENS } from '../../data/allergens';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { TagInput } from '../atoms/TagInput';
import { FieldLabel } from '../atoms/RequiredLabel';
import { EditableIngredientRow } from '../molecules/EditableIngredientRow';
import { EditableInstructionRow } from '../molecules/EditableInstructionRow';
import { RecipeFormData } from '../../context/RecipeContext';

import { Ingredient } from '../../types';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (data: RecipeFormData) => void;
}

interface Errors {
	title?: string;
	cuisine?: string;
	cookTime?: string;
	ingredients?: string;
}

const emptyIngredient = (): Ingredient => ({
	id: crypto.randomUUID(),
	amount: 0,
	unit: 'g',
	name: ''
});

export const NewRecipeModal = ({ isOpen, onClose, onCreate }: Props) => {
	// Required
	const [title, setTitle] = useState('');
	const [cookTime, setCookTime] = useState('30');
	const [cuisine, setCuisine] = useState<string[]>([]);
	const [ingredients, setIngredients] = useState<Ingredient[]>([
		emptyIngredient()
	]);

	// Optional
	const [instructions, setInstructions] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [history, setHistory] = useState('');
	const [substitutions, setSubstitutions] = useState('');
	const [allergens, setAllergens] = useState<string[]>([]);
	const [imageUrl, setImageUrl] = useState('');
	const [images, setImages] = useState<string[]>([]);

	const [errors, setErrors] = useState<Errors>({});

	if (!isOpen) return null;

	const reset = () => {
		setTitle('');
		setCookTime('30');
		setCuisine([]);
		setIngredients([emptyIngredient()]);
		setInstructions([]);
		setDescription('');
		setHistory('');
		setSubstitutions('');
		setAllergens([]);
		setImageUrl('');
		setImages([]);
		setErrors({});
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	const addIngredient = () =>
		setIngredients((prev) => [...prev, emptyIngredient()]);

	const updateIngredient = (id: string, updated: Ingredient) =>
		setIngredients((prev) => prev.map((i) => (i.id === id ? updated : i)));

	const removeIngredient = (id: string) =>
		setIngredients((prev) =>
			prev.length > 1 ? prev.filter((i) => i.id !== id) : prev
		);

	const addInstruction = () => setInstructions((prev) => [...prev, '']);

	const updateInstruction = (index: number, value: string) =>
		setInstructions((prev) =>
			prev.map((s, i) => (i === index ? value : s))
		);

	const removeInstruction = (index: number) =>
		setInstructions((prev) => prev.filter((_, i) => i !== index));

	const moveInstruction = (index: number, direction: -1 | 1) => {
		setInstructions((prev) => {
			const next = [...prev];
			const target = index + direction;
			if (target < 0 || target >= next.length) return prev;
			[next[index], next[target]] = [next[target], next[index]];
			return next;
		});
	};

	const toggleAllergen = (allergen: string) =>
		setAllergens((prev) =>
			prev.includes(allergen)
				? prev.filter((a) => a !== allergen)
				: [...prev, allergen]
		);

	const validate = (): { errors: Errors; validIngredients: Ingredient[] } => {
		const validIngredients = ingredients.filter((i) => i.name.trim());
		const nextErrors: Errors = {};

		if (!title.trim()) nextErrors.title = 'Title is required.';
		if (cuisine.length === 0)
			nextErrors.cuisine = 'Add at least one cuisine.';
		if (!cookTime.trim() || Number(cookTime) < 1)
			nextErrors.cookTime = 'Enter a cook time of at least 1 minute.';
		if (validIngredients.length === 0)
			nextErrors.ingredients = 'Add at least one ingredient with a name.';

		return { errors: nextErrors, validIngredients };
	};

	const submit = () => {
		const { errors: nextErrors, validIngredients } = validate();

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		onCreate({
			title: title.trim(),
			cuisine,
			cook_time_minutes: Math.max(1, Number(cookTime) || 1),
			ingredients: validIngredients,
			instructions: instructions.map((s) => s.trim()).filter(Boolean),
			description: description.trim(),
			history: history.trim(),
			substitutions: substitutions.trim(),
			allergens,
			image_url: imageUrl.trim(),
			images: images.filter(Boolean)
		});

		handleClose();
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		submit();
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
			onClick={handleClose}
		>
			<div
				className='bg-bg rounded-xl shadow-lg max-w-2xl w-full max-h-[85vh] flex flex-col'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex items-center justify-between px-5 py-4 border-b border-border shrink-0'>
					<h2 className='font-semibold text-text'>New Recipe</h2>
					<button
						onClick={handleClose}
						aria-label='Close'
						className='p-1 rounded-lg text-text-secondary hover:bg-bg-hover'
					>
						<X className='w-4 h-4' />
					</button>
				</div>

				<form
					onSubmit={handleFormSubmit}
					className='flex-1 overflow-y-auto px-5 py-4 space-y-6'
				>
					{/* Required section */}
					<div className='space-y-4'>
						<p className='text-xs font-semibold text-text-secondary uppercase tracking-wide'>
							Required
						</p>

						<div>
							<Input
								label='Title'
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
									setErrors((prev) => ({
										...prev,
										title: undefined
									}));
								}}
								placeholder='Weeknight Garlic Butter Pasta'
								autoFocus
							/>
							{errors.title && (
								<p className='text-xs text-red-500 mt-1'>
									{errors.title}
								</p>
							)}
						</div>

						<div>
							<Input
								label='Cook time (minutes)'
								type='number'
								min={1}
								value={cookTime}
								onChange={(e) => {
									setCookTime(e.target.value);
									setErrors((prev) => ({
										...prev,
										cookTime: undefined
									}));
								}}
							/>
							{errors.cookTime && (
								<p className='text-xs text-red-500 mt-1'>
									{errors.cookTime}
								</p>
							)}
						</div>

						<div>
							<FieldLabel required>Cuisine</FieldLabel>
							<div className='mt-1'>
								<TagInput
									tags={cuisine}
									onChange={(value) => {
										setCuisine(value);
										setErrors((prev) => ({
											...prev,
											cuisine: undefined
										}));
									}}
									placeholder='Italian, Quick...'
								/>
							</div>
							{errors.cuisine && (
								<p className='text-xs text-red-500 mt-1'>
									{errors.cuisine}
								</p>
							)}
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<FieldLabel required>Ingredients</FieldLabel>
								<button
									type='button'
									onClick={addIngredient}
									className='flex items-center gap-1 text-sm text-accent hover:underline'
								>
									<Plus className='w-3.5 h-3.5' /> Add
									ingredient
								</button>
							</div>
							<div className='mt-1 space-y-1'>
								{ingredients.map((ing) => (
									<EditableIngredientRow
										key={ing.id}
										ingredient={ing}
										onChange={(updated) =>
											updateIngredient(ing.id, updated)
										}
										onRemove={() =>
											removeIngredient(ing.id)
										}
									/>
								))}
							</div>
							{errors.ingredients && (
								<p className='text-xs text-red-500 mt-1'>
									{errors.ingredients}
								</p>
							)}
						</div>
					</div>

					{/* Optional section */}
					<div className='space-y-4 pt-2 border-t border-border'>
						<p className='text-xs font-semibold text-text-secondary uppercase tracking-wide pt-4'>
							Optional
						</p>

						<div>
							<div className='flex items-center justify-between'>
								<FieldLabel>Instructions</FieldLabel>
								<button
									type='button'
									onClick={addInstruction}
									className='flex items-center gap-1 text-sm text-accent hover:underline'
								>
									<Plus className='w-3.5 h-3.5' /> Add step
								</button>
							</div>
							{instructions.length > 0 ? (
								<div className='mt-1 space-y-1'>
									{instructions.map((step, idx) => (
										<EditableInstructionRow
											key={idx}
											index={idx}
											step={step}
											isFirst={idx === 0}
											isLast={
												idx === instructions.length - 1
											}
											onChange={(value) =>
												updateInstruction(idx, value)
											}
											onRemove={() =>
												removeInstruction(idx)
											}
											onMoveUp={() =>
												moveInstruction(idx, -1)
											}
											onMoveDown={() =>
												moveInstruction(idx, 1)
											}
										/>
									))}
								</div>
							) : (
								<p className='text-sm text-text-secondary mt-1'>
									No steps added yet.
								</p>
							)}
						</div>

						<div>
							<FieldLabel>Description</FieldLabel>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={2}
								placeholder='A short description of this dish...'
								className='mt-1 w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
							/>
						</div>

						<div>
							<FieldLabel>History</FieldLabel>
							<textarea
								value={history}
								onChange={(e) => setHistory(e.target.value)}
								rows={2}
								placeholder='Where does this dish come from?'
								className='mt-1 w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
							/>
						</div>

						<div>
							<FieldLabel>Substitutions</FieldLabel>
							<textarea
								value={substitutions}
								onChange={(e) =>
									setSubstitutions(e.target.value)
								}
								rows={2}
								placeholder='e.g. Swap butter for margarine...'
								className='mt-1 w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
							/>
						</div>

						<div>
							<FieldLabel>Allergens</FieldLabel>
							<div className='mt-1 flex flex-wrap gap-2'>
								{COMMON_ALLERGENS.map((a) => {
									const active = allergens.includes(a);
									return (
										<button
											key={a}
											type='button'
											onClick={() => toggleAllergen(a)}
											className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
												active
													? 'bg-red-50 text-red-600 border-red-200'
													: 'bg-white text-text-secondary border-border'
											}`}
										>
											{a}
										</button>
									);
								})}
							</div>
						</div>

						<div>
							<Input
								label='Image URL'
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder='https://...'
							/>
						</div>

						<div>
							<FieldLabel>Additional photos</FieldLabel>
							<div className='mt-1'>
								<TagInput
									tags={images}
									onChange={setImages}
									placeholder='Add photo URL...'
								/>
							</div>
						</div>
					</div>
				</form>

				<div className='flex justify-end gap-2 px-5 py-4 border-t border-border shrink-0'>
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
			</div>
		</div>
	);
};
