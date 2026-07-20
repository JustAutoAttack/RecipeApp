import { useState } from 'react';
import {
	Clock,
	Star,
	Pencil,
	Trash2,
	Plus,
	Check,
	X,
	Image as ImageIcon,
	AlertTriangle
} from 'lucide-react';

import { IngredientRow } from '../molecules/IngredientRow';
import { EditableIngredientRow } from '../molecules/EditableIngredientRow';
import { EditableInstructionRow } from '../molecules/EditableInstructionRow';
import { ConfirmModal } from '../molecules/ConfirmModal';
import { TagInput } from '../atoms/TagInput';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { COMMON_ALLERGENS } from '../../data/allergens';
import { Recipe, Ingredient } from '../../types';
import { formatCookTime } from '../../utils/time';

interface UpdateData {
	title: string;
	cuisine: string[];
	cook_time_minutes: number;
	ingredients: Ingredient[];
	instructions: string[];
	description: string;
	history: string;
	substitutions: string;
	allergens: string[];
	image_url: string;
	images: string[];
}

interface Props {
	recipe: Recipe;
	onUpdate: (id: string, data: UpdateData) => void;
	onDelete: (id: string) => void;
	onToggleFavorite: (id: string) => void;
}

export const RecipeView = ({
	recipe,
	onUpdate,
	onDelete,
	onToggleFavorite
}: Props) => {
	const [isEditing, setIsEditing] = useState(false);
	const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

	const [title, setTitle] = useState(recipe.title);
	const [cuisine, setCuisine] = useState<string[]>(recipe.cuisine);
	const [cookTime, setCookTime] = useState(String(recipe.cook_time_minutes));
	const [ingredients, setIngredients] = useState<Ingredient[]>(
		recipe.ingredients
	);
	const [instructions, setInstructions] = useState<string[]>(
		recipe.instructions
	);
	const [description, setDescription] = useState(recipe.description ?? '');
	const [history, setHistory] = useState(recipe.history ?? '');
	const [substitutions, setSubstitutions] = useState(
		recipe.substitutions ?? ''
	);
	const [allergens, setAllergens] = useState<string[]>(
		recipe.allergens ?? []
	);
	const [imageUrl, setImageUrl] = useState(recipe.image_url ?? '');
	const [images, setImages] = useState<string[]>(recipe.images ?? []);

	const startEditing = () => {
		setTitle(recipe.title);
		setCuisine(recipe.cuisine);
		setCookTime(String(recipe.cook_time_minutes));
		setIngredients(recipe.ingredients);
		setInstructions(recipe.instructions);
		setDescription(recipe.description ?? '');
		setHistory(recipe.history ?? '');
		setSubstitutions(recipe.substitutions ?? '');
		setAllergens(recipe.allergens ?? []);
		setImageUrl(recipe.image_url ?? '');
		setImages(recipe.images ?? []);
		setIsEditing(true);
	};

	const cancelEditing = () => setIsEditing(false);

	const saveEditing = () => {
		if (!title.trim()) return;
		onUpdate(recipe.id, {
			title: title.trim(),
			cuisine,
			cook_time_minutes: Math.max(1, Number(cookTime) || 1),
			ingredients: ingredients.filter((i) => i.name.trim()),
			instructions: instructions.filter((s) => s.trim()),
			description: description.trim(),
			history: history.trim(),
			substitutions: substitutions.trim(),
			allergens,
			image_url: imageUrl.trim(),
			images: images.filter(Boolean)
		});
		setIsEditing(false);
	};

	const addIngredient = () =>
		setIngredients((prev) => [
			...prev,
			{ id: crypto.randomUUID(), amount: 0, unit: 'g', name: '' }
		]);

	const updateIngredient = (id: string, updated: Ingredient) =>
		setIngredients((prev) => prev.map((i) => (i.id === id ? updated : i)));

	const removeIngredient = (id: string) =>
		setIngredients((prev) => prev.filter((i) => i.id !== id));

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

	const handleDelete = () => {
		setConfirmDeleteOpen(false);
		onDelete(recipe.id);
	};

	return (
		<div className='p-4 pb-20 max-w-3xl mx-auto'>
			{/* Header: primary image left, title/meta right */}
			<div className='flex flex-col sm:flex-row gap-5'>
				<div className='sm:w-56 shrink-0'>
					{isEditing ? (
						<div className='space-y-2'>
							<div className='aspect-square rounded-xl bg-bg-hover border border-border overflow-hidden flex items-center justify-center'>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt=''
										className='w-full h-full object-cover'
									/>
								) : (
									<ImageIcon className='w-8 h-8 text-text-secondary' />
								)}
							</div>
							<Input
								label='Image URL'
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder='https://...'
							/>
						</div>
					) : recipe.image_url ? (
						<img
							src={recipe.image_url}
							alt={recipe.title}
							className='w-full aspect-square object-cover rounded-xl border border-border'
						/>
					) : (
						<div className='w-full aspect-square rounded-xl bg-bg-hover border border-border flex items-center justify-center'>
							<ImageIcon className='w-8 h-8 text-text-secondary' />
						</div>
					)}
				</div>

				<div className='flex-1 min-w-0'>
					<div className='flex items-start justify-between gap-3'>
						{isEditing ? (
							<div className='flex-1'>
								<Input
									label='Title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
						) : (
							<h1 className='text-2xl font-bold text-text'>
								{recipe.title}
							</h1>
						)}

						{!isEditing && (
							<div className='flex items-center gap-1 shrink-0'>
								<button
									onClick={() => onToggleFavorite(recipe.id)}
									aria-label={
										recipe.favorite
											? 'Remove from favorites'
											: 'Add to favorites'
									}
									className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover'
								>
									<Star
										className={`w-5 h-5 ${recipe.favorite ? 'fill-accent text-accent' : ''}`}
									/>
								</button>
								<button
									onClick={startEditing}
									aria-label='Edit recipe'
									className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover'
								>
									<Pencil className='w-4 h-4' />
								</button>
								<button
									onClick={() => setConfirmDeleteOpen(true)}
									aria-label='Delete recipe'
									className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover hover:text-red-600'
								>
									<Trash2 className='w-4 h-4' />
								</button>
							</div>
						)}
					</div>

					{isEditing ? (
						<div className='flex items-start gap-4 mt-3'>
							<div className='w-32'>
								<Input
									label='Cook time (min)'
									type='number'
									min={1}
									value={cookTime}
									onChange={(e) =>
										setCookTime(e.target.value)
									}
								/>
							</div>
							<div className='flex-1'>
								<label className='text-sm font-medium text-text'>
									Cuisine
								</label>
								<div className='mt-1'>
									<TagInput
										tags={cuisine}
										onChange={setCuisine}
										placeholder='Add cuisine...'
									/>
								</div>
							</div>
						</div>
					) : (
						<div className='flex items-center gap-3 mt-2 flex-wrap'>
							<div className='flex items-center gap-1 text-sm text-text-secondary font-mono'>
								<Clock className='w-4 h-4' />
								{formatCookTime(recipe.cook_time_minutes)}
							</div>
							<div className='flex flex-wrap gap-1'>
								{recipe.cuisine.map((c) => (
									<Badge
										key={c}
										label={c}
									/>
								))}
							</div>
						</div>
					)}

					<div className='mt-4'>
						{isEditing ? (
							<div>
								<label className='text-sm font-medium text-text'>
									Description
								</label>
								<textarea
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									rows={3}
									placeholder='A short description of this dish...'
									className='mt-1 w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
								/>
							</div>
						) : recipe.description ? (
							<p className='text-sm text-text-secondary leading-relaxed'>
								{recipe.description}
							</p>
						) : null}
					</div>
				</div>
			</div>

			{(isEditing || (recipe.images && recipe.images.length > 0)) && (
				<section className='mt-6'>
					<h2 className='text-lg font-semibold text-text mb-2'>
						Photos
					</h2>
					{isEditing ? (
						<TagInput
							tags={images}
							onChange={setImages}
							placeholder='Add photo URL...'
						/>
					) : (
						<div className='flex gap-2 overflow-x-auto pb-1'>
							{recipe.images!.map((src, idx) => (
								<img
									key={idx}
									src={src}
									alt={`${recipe.title} ${idx + 1}`}
									className='w-28 h-28 object-cover rounded-lg border border-border shrink-0'
								/>
							))}
						</div>
					)}
				</section>
			)}

			{(isEditing ||
				(recipe.allergens && recipe.allergens.length > 0)) && (
				<section className='mt-6'>
					<h2 className='text-lg font-semibold text-text mb-2'>
						Allergens
					</h2>
					{isEditing ? (
						<div className='flex flex-wrap gap-2'>
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
					) : (
						<div className='flex flex-wrap gap-2'>
							{recipe.allergens!.map((a) => (
								<span
									key={a}
									className='flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600'
								>
									<AlertTriangle className='w-3 h-3' />
									{a}
								</span>
							))}
						</div>
					)}
				</section>
			)}

			<section className='mt-6'>
				<div className='flex items-center justify-between mb-2'>
					<h2 className='text-lg font-semibold text-text'>
						Ingredients
					</h2>
					{isEditing && (
						<button
							onClick={addIngredient}
							className='flex items-center gap-1 text-sm text-accent hover:underline'
						>
							<Plus className='w-3.5 h-3.5' /> Add ingredient
						</button>
					)}
				</div>

				{isEditing ? (
					ingredients.length > 0 ? (
						<div className='space-y-1'>
							{ingredients.map((ing) => (
								<EditableIngredientRow
									key={ing.id}
									ingredient={ing}
									onChange={(updated) =>
										updateIngredient(ing.id, updated)
									}
									onRemove={() => removeIngredient(ing.id)}
								/>
							))}
						</div>
					) : (
						<p className='text-sm text-text-secondary'>
							No ingredients yet. Add one above.
						</p>
					)
				) : recipe.ingredients.length > 0 ? (
					recipe.ingredients.map((i) => (
						<IngredientRow
							key={i.id}
							{...i}
						/>
					))
				) : (
					<p className='text-sm text-text-secondary'>
						No ingredients added yet.
					</p>
				)}
			</section>

			<section className='mt-6'>
				<div className='flex items-center justify-between mb-2'>
					<h2 className='text-lg font-semibold text-text'>
						Instructions
					</h2>
					{isEditing && (
						<button
							onClick={addInstruction}
							className='flex items-center gap-1 text-sm text-accent hover:underline'
						>
							<Plus className='w-3.5 h-3.5' /> Add step
						</button>
					)}
				</div>

				{isEditing ? (
					instructions.length > 0 ? (
						<div className='space-y-1'>
							{instructions.map((step, idx) => (
								<EditableInstructionRow
									key={idx}
									index={idx}
									step={step}
									isFirst={idx === 0}
									isLast={idx === instructions.length - 1}
									onChange={(value) =>
										updateInstruction(idx, value)
									}
									onRemove={() => removeInstruction(idx)}
									onMoveUp={() => moveInstruction(idx, -1)}
									onMoveDown={() => moveInstruction(idx, 1)}
								/>
							))}
						</div>
					) : (
						<p className='text-sm text-text-secondary'>
							No steps yet. Add one above.
						</p>
					)
				) : recipe.instructions.length > 0 ? (
					<ol className='space-y-3'>
						{recipe.instructions.map((step, idx) => (
							<li
								key={idx}
								className='flex gap-3 text-sm text-text'
							>
								<span className='font-mono text-text-secondary shrink-0'>
									{idx + 1}.
								</span>
								<span>{step}</span>
							</li>
						))}
					</ol>
				) : (
					<p className='text-sm text-text-secondary'>
						No instructions added yet.
					</p>
				)}
			</section>

			{(isEditing || recipe.substitutions) && (
				<section className='mt-6'>
					<h2 className='text-lg font-semibold text-text mb-2'>
						Substitutions
					</h2>
					{isEditing ? (
						<textarea
							value={substitutions}
							onChange={(e) => setSubstitutions(e.target.value)}
							rows={3}
							placeholder='e.g. Swap butter for margarine, or heavy cream for coconut milk...'
							className='w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
						/>
					) : (
						<p className='text-sm text-text-secondary leading-relaxed'>
							{recipe.substitutions}
						</p>
					)}
				</section>
			)}

			{(isEditing || recipe.history) && (
				<section className='mt-6'>
					<h2 className='text-lg font-semibold text-text mb-2'>
						History
					</h2>
					{isEditing ? (
						<textarea
							value={history}
							onChange={(e) => setHistory(e.target.value)}
							rows={4}
							placeholder='Where does this dish come from?'
							className='w-full p-2 text-sm border border-border rounded-lg text-text outline-none focus:ring-2 focus:ring-accent resize-none'
						/>
					) : (
						<p className='text-sm text-text-secondary leading-relaxed'>
							{recipe.history}
						</p>
					)}
				</section>
			)}

			{isEditing && (
				<div className='flex justify-end gap-2 mt-8'>
					<Button
						variant='ghost'
						onClick={cancelEditing}
					>
						<X className='w-4 h-4 mr-1' /> Cancel
					</Button>
					<Button
						variant='primary'
						onClick={saveEditing}
					>
						<Check className='w-4 h-4 mr-1' /> Save
					</Button>
				</div>
			)}

			<ConfirmModal
				isOpen={confirmDeleteOpen}
				title='Delete recipe?'
				message={`"${recipe.title}" will be permanently deleted. This can't be undone.`}
				confirmLabel='Delete'
				onConfirm={handleDelete}
				onCancel={() => setConfirmDeleteOpen(false)}
			/>
		</div>
	);
};
