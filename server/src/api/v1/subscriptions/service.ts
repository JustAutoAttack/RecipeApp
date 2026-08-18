import { CreateCheckoutSessionInput, Subscription } from './types';

export class SubscriptionsService {
	async getByUserId(userId: string): Promise<Subscription | null> {
		// TODO: Query SQLite `subscriptions` table by user_id
		const now = new Date().toISOString();
		return {
			id: 'sub_12345',
			userId,
			tier: 'free',
			activityStatus: 'active',
			stripeCustomerId: null,
			stripeSubscriptionId: null,
			currentPeriodEnd: null,
			updatedAt: now,
			createdAt: now
		};
	}

	async createCheckoutSession(
		userId: string,
		input: CreateCheckoutSessionInput
	): Promise<string> {
		// TODO: Call Stripe SDK `stripe.checkout.sessions.create()`
		return 'https://checkout.stripe.com/c/pay/cs_test_1234';
	}

	async createPortalSession(userId: string): Promise<string> {
		// TODO: Retrieve `stripeCustomerId` for `userId` & call `stripe.billingPortal.sessions.create()`
		return 'https://billing.stripe.com/p/session/test_1234';
	}

	async upsertSubscriptionFromStripe(
		userId: string,
		stripeCustomerId: string,
		stripeSubscriptionId: string,
		tier: 'free' | 'pro',
		activityStatus: 'active' | 'past_due' | 'canceled',
		currentPeriodEnd: string
	): Promise<void> {
		// TODO: INSERT OR REPLACE INTO `subscriptions`
	}
}

export const subscriptionsService = new SubscriptionsService();
