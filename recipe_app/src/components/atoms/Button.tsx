interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'ghost';
	type?: 'button' | 'submit';
}

export const Button = ({
	children,
	onClick,
	variant = 'primary',
	type = 'button'
}: ButtonProps) => {
	const base =
		'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all active:scale-95';
	const styles =
		variant === 'primary'
			? 'bg-accent text-white hover:bg-accent-hover'
			: 'text-text-secondary hover:bg-bg-hover';

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${base} ${styles}`}
		>
			{children}
		</button>
	);
};
