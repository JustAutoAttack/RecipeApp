import z from 'zod';
import { metaSchema, uuidParamSchema } from './schemas';

export type MetaDTO = z.infer<typeof metaSchema>;
export type UUIDParamDTO = z.infer<typeof uuidParamSchema>;
