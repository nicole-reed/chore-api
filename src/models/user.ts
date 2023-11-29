import { z } from 'zod';

export const userSchema = z.object({
    user_id: z.string(),
    admin_id: z.string(),
    name: z.string(),
    email: z.string()
});

export const getUserByIdRequestSchema = z.object({
    params: z.object({
        user_id: z.string()
    })
});

export const createUserRequestSchema = z.object({
    body: z.object({
        admin_id: z.string(),
        name: z.string(),
        email: z.string()
    })
});

export const updateUserRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string()
    }),
    params: z.object({
        user_id: z.string()
    })
});

export const deleteUserRequestSchema = z.object({
    params: z.object({
        user_id: z.string()
    })
});

export type User = z.infer<typeof userSchema>