import { useContext } from 'react';

import { NetworkContext } from './NetworkContext';


export const useNetwork = () => {
	const ctx = useContext(NetworkContext);
	if (!ctx)
		throw new Error('useNetwork must be used within a NetworkProvider');
	return ctx;
};
