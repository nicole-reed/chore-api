import { getDb } from "../database/knex.service";
import { z } from "zod";
import { User, userSchema } from "../models/user";

export const getUsers = async (): Promise<User[]> => {
    const db = await getDb()
    const users: unknown = await db.select('*').from('users')

    return z.array(userSchema).parse(users)
}

export const usersRepository = { getUsers };