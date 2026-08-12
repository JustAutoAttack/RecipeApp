export interface IUserContext {
	user: User;
	settings: UserSettings;
}

export interface UserRow {
	id: string;
	username: string;
	created_at: string;
}

export interface User {
	id: string;
	username: string;
	createdAt: string;
}

export interface UserSettings {
	theme?: string;
	// Add future user preferences here
}
