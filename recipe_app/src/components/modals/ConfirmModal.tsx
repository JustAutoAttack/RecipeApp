import { Button } from '../atoms/Button';

interface Props {
	isOpen: boolean;
	title: string;
	message: string;
	confirmLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export const ConfirmModal = ({
	isOpen,
	title,
	message,
	confirmLabel = 'Confirm',
	onConfirm,
	onCancel
}: Props) => {
	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
			onClick={onCancel}
		>
			<div
				className='bg-bg rounded-xl shadow-lg max-w-sm w-full p-5'
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className='font-semibold text-text'>{title}</h2>
				<p className='text-sm text-text-secondary mt-2'>{message}</p>
				<div className='flex justify-end gap-2 mt-5'>
					<Button
						variant='ghost'
						onClick={onCancel}
					>
						Cancel
					</Button>
					<button
						onClick={onConfirm}
						className='inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all active:scale-95 bg-red-600 text-white hover:bg-red-700'
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
};
