import { RefreshCw } from 'lucide-react';

import { useNetwork } from '../../context/NetworkContext';

interface Props {
	version: string;
}

export const Footer = ({ version }: Props) => {
	const { status, lastSyncedAt, sync } = useNetwork();

	const getStatusDetails = () => {
		switch (status) {
			case 'connected':
				return {
					color: 'bg-emerald-500',
					text: 'Synced with local node'
				};
			case 'syncing':
				return {
					color: 'bg-amber-500 animate-pulse',
					text: 'Synchronizing...'
				};
			case 'offline':
				return { color: 'bg-gray-400', text: 'Offline (Local-only)' };
			case 'error':
				return { color: 'bg-red-500', text: 'Sync error' };
		}
	};

	const currentStatus = getStatusDetails();

	const formattedLastSync = lastSyncedAt
		? lastSyncedAt.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
		: 'Never';

	return (
		<footer className='h-14 flex items-center justify-between px-6 border-t border-border bg-bg shrink-0 text-xs text-text-secondary'>
			{/* Left side: Connection status & sync controls stacked */}
			<div className='flex flex-col gap-0.5'>
				{/* Top: Connection Status Indicator */}
				<div className='flex items-center gap-2'>
					<span
						className={`w-2 h-2 rounded-full ${currentStatus.color}`}
					/>
					<span className='font-medium text-text'>
						{currentStatus.text}
					</span>
				</div>

				{/* Bottom: Sync Button & Last Synced At */}
				<div className='flex items-center gap-2'>
					<button
						onClick={sync}
						disabled={status === 'syncing'}
						className='flex items-center gap-1 hover:text-text transition-colors disabled:opacity-50'
					>
						<RefreshCw
							className={`w-3 h-3 ${status === 'syncing' ? 'animate-spin' : ''}`}
						/>
						<span>Sync now</span>
					</button>
					<span>•</span>
					<span>Last synced: {formattedLastSync}</span>
				</div>
			</div>

			{/* Right side: Version */}
			<div className='font-mono text-text-secondary'>v{version}</div>
		</footer>
	);
};
