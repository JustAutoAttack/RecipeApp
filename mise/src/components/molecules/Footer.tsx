import { RefreshCw } from 'lucide-react';

import { useNetwork } from '../../core/network/NetworkContext';

interface Props {
	version: string;
}

export const Footer = ({ version }: Props) => {
	const { status, lastSyncedAt, sync } = useNetwork();

	const getStatusConfig = () => {
		switch (status) {
			case 'connected':
				return {
					color: 'bg-emerald-500',
					text: `Last synced: ${
						lastSyncedAt
							? lastSyncedAt.toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit'
								})
							: 'Never'
					}`
				};
			case 'syncing':
				return {
					color: 'bg-amber-500 animate-pulse',
					text: 'Synchronizing...'
				};
			case 'offline':
				return {
					color: 'bg-gray-400',
					text: 'Offline (Local-only)'
				};
			case 'error':
				return {
					color: 'bg-red-500',
					text: 'Connection failed. Click to retry.'
				};
		}
	};

	const currentConfig = getStatusConfig();
	const isSyncing = status === 'syncing';

	return (
		<footer className='h-14 flex items-center justify-between px-6 border-t border-border bg-bg shrink-0 text-xs text-text-secondary'>
			{/* Left */}
			<div className='flex items-center gap-3'>
				<button
					onClick={sync}
					disabled={isSyncing}
					className='flex items-center gap-1.5 hover:text-text transition-colors disabled:opacity-50 font-medium text-text'
					title={status === 'error' ? 'Retry connection' : 'Sync now'}
				>
					<RefreshCw
						className={`w-3.5 h-3.5 ${
							isSyncing ? 'animate-spin text-amber-500' : ''
						}`}
					/>
					<span>Sync</span>
				</button>

				<span>•</span>

				{/* Status indicator + dynamic text */}
				<div className='flex items-center gap-2'>
					<span
						className={`w-2 h-2 rounded-full ${currentConfig.color}`}
					/>
					<span className='text-text-secondary'>
						{currentConfig.text}
					</span>
				</div>
			</div>

			{/* Right */}
			<div className='font-mono text-text-secondary'>v{version}</div>
		</footer>
	);
};
