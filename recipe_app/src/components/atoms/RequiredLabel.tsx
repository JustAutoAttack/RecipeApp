interface Props {
	children: React.ReactNode;
	required?: boolean;
}

export const FieldLabel = ({ children, required }: Props) => (
	<label className='text-sm font-medium text-text flex items-center gap-1'>
		{children}
		{required && <span className='text-red-500'>*</span>}
	</label>
);
