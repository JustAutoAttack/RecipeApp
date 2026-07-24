interface FooterProps {
	version: string;
}

export const Footer = ({ version }: FooterProps) => (
	<footer className='h-8 flex items-center justify-between px-4 border-t border-border bg-bg-secondary shrink-0'>
		<span className='text-xs font-mono text-text-secondary'>
			v{version}
		</span>
	</footer>
);
