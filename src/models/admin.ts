import { z } from 'zod';

export const adminSchema = z.object({
    admin_id: z.string(),
    name: z.string(),
    email: z.string()
});

export const getAdminByIdRequestSchema = z.object({
    params: z.object({
        admin_id: z.string()
    })
});

export const createAdminRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string()
    })
});

export const updateAdminRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string()
    }),
    params: z.object({
        admin_id: z.string()
    })
});

export type Admin = z.infer<typeof adminSchema>