import { z } from '@hono/zod-openapi';
import {
	CreateCheckoutSessionSchema,
	SessionUrlResponseSchema,
	SubscriptionSchema
} from './schemas';

export type Subscription = z.infer<typeof SubscriptionSchema>;
export type CreateCheckoutSessionInput = z.infer<
	typeof CreateCheckoutSessionSchema
>;
export type SessionUrlResponse = z.infer<typeof SessionUrlResponseSchema>;
