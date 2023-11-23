import { z } from 'zod';

export const userSchema = z.object({
    user_id: z.string(),
    admin_id: z.string(),
    name: z.string(),
    email: z.string()
});

export type User = z.infer<typeof userSchema>