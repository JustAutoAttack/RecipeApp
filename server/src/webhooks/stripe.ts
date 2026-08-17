import { Hono } from 'hono';

export const stripeWebhookRouter = new Hono();

stripeWebhookRouter.post('/stripe', async (c) => {
	const signature = c.req.header('stripe-signature');
	const rawBody = await c.req.text();

	// Verify signature with stripe.webhooks.constructEvent(rawBody, signature, secret)
	// Update `subscriptions` table based on event type:
	// - checkout.session.completed -> tier = 'pro', activity_status = 'active'
	// - customer.subscription.deleted -> tier = 'free', activity_status = 'canceled'
	// - invoice.payment_failed -> activity_status = 'past_due'

	return c.json({ received: true }, 200);
});
