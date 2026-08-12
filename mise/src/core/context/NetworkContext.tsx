import { createContext } from 'react';

import { ConnectionState } from '../types';

export interface INetworkContext {
	status: ConnectionState;
	lastSyncedAt: Date | null;
	sync: () => Promise<void>;
}

export const NetworkContext = createContext<INetworkContext | undefined>(
	undefined
);
