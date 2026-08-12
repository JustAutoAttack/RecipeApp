import z from 'zod';
import { createUserSchema, readUserSchema, updateUserSchema } from './schemas';

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type ReadUserDTO = z.infer<typeof readUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
