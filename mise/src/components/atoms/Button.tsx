import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'ghost';
	type?: 'button' | 'submit';
	className?: string;
	disabled?: boolean;
}

export const Button = ({
	children,
	onClick,
	variant = 'primary',
	type = 'button',
	className = '',
	disabled = false
}: ButtonProps) => {
	const base =
		'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

	const getVariantStyles = () => {
		switch (variant) {
			case 'primary':
				return 'bg-accent text-white hover:bg-accent-hover';
			case 'secondary':
				return 'bg-bg-secondary text-text border border-border hover:bg-bg-hover';
			case 'ghost':
			default:
				return 'text-text-secondary hover:bg-bg-hover';
		}
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${base} ${getVariantStyles()} ${className}`}
		>
			{children}
		</button>
	);
};
