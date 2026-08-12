import { useContext } from 'react';
import type { Context } from 'react';

export const useSafeContext = <T>(
	context: Context<T | undefined>,
	hookName: string,
	providerName: string
): T => {
	const value = useContext(context);
	if (value === undefined) {
		throw new Error(`${hookName} must be used within a ${providerName}`);
	}
	return value;
};
