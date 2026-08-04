interface BadgeProps {
	label: string;
}

export const Badge = ({ label }: BadgeProps) => (
	<span className='px-2 py-0.5 text-xs font-medium bg-blue-50 text-accent rounded-full'>
		{label}
	</span>
);
