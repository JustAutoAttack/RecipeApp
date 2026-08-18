import { createRoute } from '@hono/zod-openapi';

import {
	CreateCheckoutSessionSchema,
	SessionUrlResponseSchema,
	SubscriptionErrorSchema,
	SubscriptionSchema
} from './schemas';

export const getMySubscriptionRoute = createRoute({
	method: 'get',
	path: '/me',
	tags: ['Subscriptions'],
	summary: 'Get Current User Subscription',
	description:
		'Retrieves complete billing details and Stripe IDs for the active user.',
	responses: {
		200: {
			content: { 'application/json': { schema: SubscriptionSchema } },
			description: 'Subscription details retrieved'
		},
		404: {
			content: {
				'application/json': { schema: SubscriptionErrorSchema }
			},
			description: 'Subscription not found'
		}
	}
});

export const createCheckoutSessionRoute = createRoute({
	method: 'post',
	path: '/checkout',
	tags: ['Subscriptions'],
	summary: 'Create Checkout Session',
	description:
		'Generates a Stripe Checkout URL to initiate a Pro subscription.',
	request: {
		body: {
			content: {
				'application/json': { schema: CreateCheckoutSessionSchema }
			}
		}
	},
	responses: {
		200: {
			content: {
				'application/json': { schema: SessionUrlResponseSchema }
			},
			description: 'Redirect URL generated'
		}
	}
});

export const createPortalSessionRoute = createRoute({
	method: 'post',
	path: '/portal',
	tags: ['Subscriptions'],
	summary: 'Create Customer Portal Session',
	description:
		'Generates a Stripe Customer Portal URL for managing credit cards or canceling.',
	responses: {
		200: {
			content: {
				'application/json': { schema: SessionUrlResponseSchema }
			},
			description: 'Portal URL generated'
		}
	}
});
