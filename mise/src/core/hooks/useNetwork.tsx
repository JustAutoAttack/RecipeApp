import { useContext } from 'react';

import { INetworkContext, NetworkContext } from '../context';

export const useNetwork = (): INetworkContext => {
	const ctx = useContext(NetworkContext);
	if (!ctx)
		throw new Error('useNetwork must be used within a NetworkProvider');
	return ctx;
};
