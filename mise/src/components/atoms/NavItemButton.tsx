import { ReactNode } from 'react';

interface NavItemButtonProps {
	icon: ReactNode;
	label: ReactNode;
	isActive: boolean;
	onClick: () => void;
	className?: string;
}

export const NavItemButton = ({
	icon,
	label,
	isActive,
	onClick,
	className = ''
}: NavItemButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
				isActive
					? 'bg-accent/10 text-accent'
					: 'text-text hover:bg-bg-hover'
			} ${className}`}
		>
			<span className='shrink-0'>{icon}</span>
			<span className='truncate'>{label}</span>
		</button>
	);
};
