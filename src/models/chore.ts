import { z } from 'zod';
import { Status } from '../enums/status.enum';

export const choreSchema = z.object({
    chore_id: z.string(),
    admin_id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    assigned_to: z.string().nullable(),
    deadline: z.date().nullable(),
    value: z.string().nullable(),
    status: z.nativeEnum(Status)
});

export type Chore = z.infer<typeof choreSchema>