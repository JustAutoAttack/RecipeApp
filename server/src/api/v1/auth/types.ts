import z from 'zod';
import {
	changePasswordReqSchema,
	changePasswordResSchema,
	forgotPasswordReqSchema,
	forgotPasswordResSchema,
	refreshTokenReqSchema,
	refreshTokenResSchema,
	signInReqSchema,
	signInResSchema,
	signOutReqSchema,
	signOutResSchema,
	signUpReqSchema,
	signUpResSchema
} from './schemas';

export type SignUpReqDTO = z.infer<typeof signUpReqSchema>;
export type SignUpResDTO = z.infer<typeof signUpResSchema>;

export type SignInReqDTO = z.infer<typeof signInReqSchema>;
export type SignInResDTO = z.infer<typeof signInResSchema>;

export type SignOutReqDTO = z.infer<typeof signOutReqSchema>;
export type SignOutResDTO = z.infer<typeof signOutResSchema>;

export type ForgotPasswordReqDTO = z.infer<typeof forgotPasswordReqSchema>;
export type ForgotPasswordResDTO = z.infer<typeof forgotPasswordResSchema>;

export type ChangePasswordReqDTO = z.infer<typeof changePasswordReqSchema>;
export type ChangePasswordResDTO = z.infer<typeof changePasswordResSchema>;

export type RefreshTokenReqDTO = z.infer<typeof refreshTokenReqSchema>;
export type RefreshTokenResDTO = z.infer<typeof refreshTokenResSchema>;

export interface SignUpInput {
	username: string;
	email: string;
	password: string;
	display_name: string;
}

export interface SignInInput {
	email: string;
	password: string;
}
