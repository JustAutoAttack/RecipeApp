interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const Input = ({ label, ...props }: InputProps) => (
	<div className='flex flex-col gap-1'>
		<label className='text-sm font-medium text-text'>{label}</label>
		<input
			{...props}
			className='p-2 border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none text-text'
		/>
	</div>
);
