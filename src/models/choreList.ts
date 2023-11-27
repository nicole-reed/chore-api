import { z } from 'zod';

export const choreListSchema = z.object({
    chore_list_id: z.string(),
    admin_id: z.string(),
    title: z.string(),
    assigned_to: z.string().nullable(),
    deadline: z.date().nullable(),
    value: z.string().nullable(),
    notes: z.string().nullable(),
    complete: z.boolean().default(false)
});

export const getChoreListByIdRequestSchema = z.object({
    params: z.object({
        chore_list_id: z.string()
    })
});

export type ChoreList = z.infer<typeof choreListSchema>