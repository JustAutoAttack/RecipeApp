import { z } from 'zod';
import { readUserSchema } from '../users';
import { messageResponseSchema, tokenPairSchema } from '../../../core/common';

// --- Sign Up ---
export const signUpReqSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	display_name: z.string().min(1, 'Display name is required'),
	theme: z.string().default('system'),
	allergens: z.array(z.string()).optional(),
	pantry_tracking_enabled: z.boolean().default(true)
});

export const signUpResSchema = z.object({
	success: z.boolean(),
	data: z.object({
		user: readUserSchema,
		tokens: tokenPairSchema
	})
});

// --- Sign In ---
export const signInReqSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password is required')
});

export const signInResSchema = signUpResSchema;

// --- Sign Out---
export const signOutReqSchema = z.object({
	refresh_token: z.string().optional()
});

export const signOutResSchema = messageResponseSchema;

// --- Forgot Password ---
export const forgotPasswordReqSchema = z.object({
	email: z.string().email('Invalid email address')
});

export const forgotPasswordResSchema = messageResponseSchema;

// --- Change Password ---
export const changePasswordReqSchema = z.object({
	current_password: z.string().min(8, 'Current password is required'),
	new_password: z
		.string()
		.min(8, 'New password must be at least 8 characters')
});

export const changePasswordResSchema = messageResponseSchema;

// --- Refresh Token ---
export const refreshTokenReqSchema = z.object({
	refresh_token: z.string().min(1, 'Refresh token is required')
});

export const refreshTokenResSchema = z.object({
	success: z.boolean(),
	data: tokenPairSchema
});
