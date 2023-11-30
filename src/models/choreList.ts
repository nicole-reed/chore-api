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

export const getChoreListsByAdminIdRequestSchema = z.object({
    params: z.object({
        admin_id: z.string()
    })
});

export const getChoreListsByAssignedToRequestSchema = z.object({
    params: z.object({
        user_id: z.string()
    })
});

export const createChoreListRequestSchema = z.object({
    body: z.object({
        admin_id: z.string(),
        title: z.string(),
        assigned_to: z.string().optional(),
        deadline: z.date().optional(),
        value: z.string().optional(),
        notes: z.string().optional(),
        complete: z.boolean().default(false)
    })
});

export const updateChoreListRequestSchema = z.object({
    body: z.object({
        title: z.string(),
        assigned_to: z.string().optional(),
        deadline: z.date().optional(),
        value: z.string().optional(),
        notes: z.string().optional(),
        complete: z.boolean().default(false)
    }),
    params: z.object({
        chore_list_id: z.string()
    })
});

export const deleteChoreListRequestSchema = z.object({
    params: z.object({
        chore_list_id: z.string()
    })
});

export type ChoreList = z.infer<typeof choreListSchema>