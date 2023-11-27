import { getDb } from "../database/knex.service";
import { z } from "zod";
import { User, userSchema } from "../models/user";

export const getUsers = async (): Promise<User[]> => {
    const db = await getDb()
    const users: unknown = await db.select('*').from('users')

    return z.array(userSchema).parse(users)
}

export const getUserById = async (user_id: string): Promise<User> => {
    const db = await getDb()
    const user: unknown[] = await db.select('*').from('users').where('user_id', user_id)

    return userSchema.parse(user[0])
}

export const usersRepository = { getUsers, getUserById };