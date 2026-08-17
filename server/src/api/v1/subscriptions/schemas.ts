import { z } from '@hono/zod-openapi';

export const SubscriptionSchema = z.object({
	id: z.string().openapi({ example: 'sub_12345' }),
	userId: z.string().openapi({ example: 'usr_123456' }),
	tier: z.enum(['free', 'pro']).openapi({ example: 'pro' }),
	activityStatus: z
		.enum(['active', 'past_due', 'canceled'])
		.openapi({ example: 'active' }),
	stripeCustomerId: z.string().nullable().openapi({ example: 'cus_N9X1234' }),
	stripeSubscriptionId: z
		.string()
		.nullable()
		.openapi({ example: 'sub_M8Y5678' }),
	currentPeriodEnd: z
		.string()
		.nullable()
		.openapi({ example: '2026-09-01T00:00:00.000Z' }),
	updatedAt: z.string().openapi({ example: '2026-08-17T15:00:00.000Z' }),
	createdAt: z.string().openapi({ example: '2026-08-01T10:00:00.000Z' })
});

export const CreateCheckoutSessionSchema = z.object({
	priceId: z.string().openapi({ example: 'price_1N234567890' }),
	successUrl: z
		.string()
		.url()
		.openapi({ example: 'https://app.example.com/billing?success=true' }),
	cancelUrl: z
		.string()
		.url()
		.openapi({ example: 'https://app.example.com/billing?canceled=true' })
});

export const SessionUrlResponseSchema = z.object({
	url: z
		.string()
		.url()
		.openapi({ example: 'https://checkout.stripe.com/c/pay/cs_test_1234' })
});

export const SubscriptionErrorSchema = z.object({
	error: z.string().openapi({ example: 'Subscription not found' })
});
