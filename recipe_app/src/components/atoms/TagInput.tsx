import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
	tags: string[];
	onChange: (tags: string[]) => void;
	placeholder?: string;
}

export const TagInput = ({ tags, onChange, placeholder }: Props) => {
	const [input, setInput] = useState('');

	const addTag = () => {
		const trimmed = input.trim();
		if (trimmed && !tags.includes(trimmed)) {
			onChange([...tags, trimmed]);
		}
		setInput('');
	};

	const removeTag = (tag: string) => onChange(tags.filter((t) => t !== tag));

	return (
		<div className='flex flex-wrap items-center gap-1.5 p-2 border border-border rounded-lg focus-within:ring-2 focus-within:ring-accent'>
			{tags.map((tag) => (
				<span
					key={tag}
					className='flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full text-xs font-medium bg-blue-50 text-accent'
				>
					{tag}
					<button
						type='button'
						onClick={() => removeTag(tag)}
						aria-label={`Remove ${tag}`}
						className='p-0.5 rounded-full hover:bg-blue-100'
					>
						<X className='w-3 h-3' />
					</button>
				</span>
			))}
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ',') {
						e.preventDefault();
						addTag();
					} else if (
						e.key === 'Backspace' &&
						!input &&
						tags.length > 0
					) {
						removeTag(tags[tags.length - 1]);
					}
				}}
				onBlur={addTag}
				placeholder={tags.length === 0 ? placeholder : ''}
				className='flex-1 min-w-20 outline-none text-sm text-text bg-transparent py-0.5'
			/>
		</div>
	);
};
