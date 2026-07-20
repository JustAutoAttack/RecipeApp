import { createContext, useContext, useState, ReactNode } from 'react';
import { MeasurementSystem } from '../types';

interface PreferencesContextValue {
	unitSystem: MeasurementSystem;
	setUnitSystem: (system: MeasurementSystem) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
	undefined
);
const STORAGE_KEY = 'recip:unit-system';

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
	const [unitSystem, setUnitSystemState] = useState<MeasurementSystem>(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		return stored === 'imperial' || stored === 'metric' ? stored : 'metric';
	});

	const setUnitSystem = (system: MeasurementSystem) => {
		setUnitSystemState(system);
		window.localStorage.setItem(STORAGE_KEY, system);
	};

	return (
		<PreferencesContext.Provider value={{ unitSystem, setUnitSystem }}>
			{children}
		</PreferencesContext.Provider>
	);
};

export const usePreferences = () => {
	const ctx = useContext(PreferencesContext);
	if (!ctx)
		throw new Error(
			'usePreferences must be used within a PreferencesProvider'
		);
	return ctx;
};
