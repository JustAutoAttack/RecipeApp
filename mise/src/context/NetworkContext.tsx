import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
	useEffect
} from 'react';

import { telemetryService } from '../services/telemetryService';

type ConnectionState = 'connected' | 'syncing' | 'offline' | 'error';

interface NetworkContextValue {
	status: ConnectionState;
	lastSyncedAt: Date | null;
	sync: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(
	undefined
);

const POLL_RATE = 30_000;

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
	const [status, setStatus] = useState<ConnectionState>('syncing');
	const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

	const sync = useCallback(async () => {
		setStatus((prev) => (prev === 'syncing' ? 'syncing' : 'syncing'));

		try {
			// Call Rust command -> checks FastAPI backend telemetry/sync endpoint
			await telemetryService.checkServerSync();

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
		const interval = setInterval(sync, POLL_RATE);
		return () => clearInterval(interval);
	}, [sync]);

	return (
		<NetworkContext.Provider value={{ status, lastSyncedAt, sync }}>
			{children}
		</NetworkContext.Provider>
	);
};

export const useNetwork = () => {
	const ctx = useContext(NetworkContext);
	if (!ctx)
		throw new Error('useNetwork must be used within a NetworkProvider');
	return ctx;
};
