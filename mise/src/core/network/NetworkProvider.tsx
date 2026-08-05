import { ReactNode, useCallback, useEffect, useState } from 'react';

import { TauriTelemetryService } from '../../services';
import { NETWORK_POLL_RATE } from '../constants';
import { NetworkContext } from './NetworkContext';
import { ConnectionState } from './types';

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
	const [status, setStatus] = useState<ConnectionState>('syncing');
	const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

	const sync = useCallback(async () => {
		setStatus((prev) => (prev === 'syncing' ? 'syncing' : 'syncing'));

		try {
			await TauriTelemetryService.checkServerSync();

			setStatus('connected');
			setLastSyncedAt(new Date());
		} catch (error) {
			console.error('Server sync check failed:', error);
			setStatus('error');
		}
	}, []);

	// Initial check on mount + periodic polling
	useEffect(() => {
		sync();
		const interval = setInterval(sync, NETWORK_POLL_RATE);
		return () => clearInterval(interval);
	}, [sync]);

	return (
		<NetworkContext.Provider value={{ status, lastSyncedAt, sync }}>
			{children}
		</NetworkContext.Provider>
	);
};
