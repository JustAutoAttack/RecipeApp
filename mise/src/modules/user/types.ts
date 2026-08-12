import { PublicFullUserViewRow } from '@core';

export type User = PublicFullUserViewRow;

export interface UserSettings {
	theme: string;
	pantryTrackingEnabled: boolean;
	allergens: string[] | null;
}

export interface IUserContext {
	user: User;
	settings: UserSettings;
}
