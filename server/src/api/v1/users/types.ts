import { z } from '@hono/zod-openapi';

import {
	UpdateUserProfileSchema,
	UserParamSchema,
	UserPrivateProfileSchema,
	UserPublicProfileSchema
} from './schemas';

export type UserParam = z.infer<typeof UserParamSchema>;
export type UserPrivateProfile = z.infer<typeof UserPrivateProfileSchema>;
export type UserPublicProfile = z.infer<typeof UserPublicProfileSchema>;
export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;
