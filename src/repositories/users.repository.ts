import { getDb } from "../database/knex.service";
import { z } from "zod";
import { User, userSchema } from "../models/user";

export const getUsers = async (): Promise<User[]> => {
    const db = await getDb()
    const users: unknown = await db.select('*').from('users')

    return z.array(userSchema).parse(users)
};

export const getUserById = async (user_id: string): Promise<User> => {
    const db = await getDb()
    const user: unknown[] = await db.select('*').from('users').where('user_id', user_id)

    return userSchema.parse(user[0])
};

export const createUser = async (admin_id: string, name: string, email: string): Promise<User> => {
    const db = await getDb()
    const user: unknown[] = await db('users').returning(['user_id', 'admin_id', 'name', 'email']).insert({ admin_id, name, email })

    return userSchema.parse(user[0])
};

export const updateUser = async (user_id: string, name: string, email: string): Promise<User> => {
    const db = await getDb()
    const user: unknown[] = await db('users').where({ user_id }).update({ name, email }, ['user_id', 'admin_id', 'name', 'email'])

    return userSchema.parse(user[0])
}

export const usersRepository = { getUsers, getUserById, createUser, updateUser };