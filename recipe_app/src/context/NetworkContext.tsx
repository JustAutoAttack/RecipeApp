import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback
} from 'react';

type ConnectionState = 'connected' | 'syncing' | 'offline' | 'error';

interface NetworkContextValue {
	status: ConnectionState;
	lastSyncedAt: Date | null;
	sync: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(
	undefined
);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
	const [status, setStatus] = useState<ConnectionState>('connected');
	const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date());

	const sync = useCallback(async () => {
		if (status === 'syncing') return;
		setStatus('syncing');

		// Simulate local-to-remote sync latency (e.g., Tauri/Supabase sync)
		await new Promise((resolve) => setTimeout(resolve, 1200));

		setStatus('connected');
		setLastSyncedAt(new Date());
	}, [status]);

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
