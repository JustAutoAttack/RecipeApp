import {
	UpdateUserProfileInput,
	UserPrivateProfile,
	UserPublicProfile
} from './types';

export class UsersService {
	async getPrivateProfile(
		userId: string
	): Promise<UserPrivateProfile | null> {
		// TODO: Query SQLite `users` table where id = userId
		return {
			id: userId,
			username: 'johndoe',
			email: 'john@example.com',
			displayName: 'John Doe',
			theme: 'system',
			allergens: ['peanuts'],
			pantryTrackingEnabled: true,
			lastConnectionDate: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			createdAt: new Date().toISOString()
		};
	}

	async updatePrivateProfile(
		userId: string,
		input: UpdateUserProfileInput
	): Promise<UserPrivateProfile> {
		// TODO: Update `users` table fields and updated_at timestamp
		return {
			id: userId,
			username: 'johndoe',
			email: 'john@example.com',
			displayName: input.displayName ?? 'John Doe',
			theme: input.theme ?? 'system',
			allergens: input.allergens ?? ['peanuts'],
			pantryTrackingEnabled: input.pantryTrackingEnabled ?? true,
			lastConnectionDate: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			createdAt: new Date().toISOString()
		};
	}

	async getPublicProfile(userId: string): Promise<UserPublicProfile | null> {
		// TODO: Query SQLite `public_full_user_view` where id = userId
		return {
			id: userId,
			username: 'johndoe',
			displayName: 'John Doe',
			theme: 'system',
			allergens: ['peanuts'],
			lastConnectionDate: new Date().toISOString(),
			subscriptionTier: 'free',
			subscriptionStatus: 'active',
			recipeCount: 5,
			totalLikesReceived: 24,
			totalFavoritesReceived: 10,
			followerCount: 15,
			followingCount: 8,
			updatedAt: new Date().toISOString(),
			createdAt: new Date().toISOString()
		};
	}

	async followUser(
		currentUserId: string,
		targetUserId: string
	): Promise<void> {
		// TODO: INSERT INTO followed_users (user_id, followed_user_id, created_at)
	}

	async unfollowUser(
		currentUserId: string,
		targetUserId: string
	): Promise<void> {
		// TODO: DELETE FROM followed_users WHERE user_id = currentUserId AND followed_user_id = targetUserId
	}
}

export const usersService = new UsersService();
