import { z } from 'zod';
import { Status } from '../enums/status.enum';

export const choreSchema = z.object({
    chore_id: z.string(),
    admin_id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    assigned_to: z.string().nullable(),
    deadline: z.string().nullable(),
    value: z.string().nullable(),
    status: z.nativeEnum(Status)
});

export const getChoreByIdRequestSchema = z.object({
    params: z.object({
        chore_id: z.string()
    })
});

export const getChoresByAdminIdRequestSchema = z.object({
    params: z.object({
        admin_id: z.string()
    }),
    query: z.object({
        assigned_to: z.string().optional(),
        status: z.nativeEnum(Status).optional(),
        deadline: z.string().optional()
    })
});

export const getChoresByAssignedToRequestSchema = z.object({
    params: z.object({
        user_id: z.string()
    }),
    query: z.object({
        status: z.nativeEnum(Status).optional(),
        deadline: z.string().optional()
    })
});

export const createChoreRequestSchema = z.object({
    body: z.object({
        admin_id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        assigned_to: z.string().optional(),
        deadline: z.string().optional(),
        value: z.string().optional(),
        status: z.nativeEnum(Status)
    })
});

export const updateChoreRequestSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        assigned_to: z.string().optional(),
        deadline: z.string().optional(),
        value: z.string().optional(),
        status: z.nativeEnum(Status)
    }),
    params: z.object({
        chore_id: z.string()
    })
});

export const deleteChoreRequestSchema = z.object({
    params: z.object({
        chore_id: z.string()
    })
});

export type Chore = z.infer<typeof choreSchema>