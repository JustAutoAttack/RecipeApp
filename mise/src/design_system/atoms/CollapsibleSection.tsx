import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
	title: string;
	count: number;
	defaultOpen?: boolean;
	children: React.ReactNode;
}

export const CollapsibleSection = ({
	title,
	count,
	defaultOpen = true,
	children
}: Props) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<section className='mb-8'>
			<button
				onClick={() => setOpen((o) => !o)}
				className='flex items-center gap-2 mb-3'
			>
				<ChevronDown
					className={`w-4 h-4 text-text-secondary transition-transform ${
						open ? '' : '-rotate-90'
					}`}
				/>
				<h2 className='text-lg font-semibold text-text'>{title}</h2>
				<span className='text-sm text-text-secondary font-mono'>
					{count}
				</span>
			</button>
			{open && children}
		</section>
	);
};
