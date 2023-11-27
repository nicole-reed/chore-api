import { z } from "zod"
import { getDb } from "../database/knex.service"
import { Chore, choreSchema } from "../models/chore"
import { Status } from "../enums/status.enum";

export const getChores = async (): Promise<Chore[]> => {
    const db = await getDb()
    const chores: unknown = await db.select('*').from('chores')

    return z.array(choreSchema).parse(chores)
};

export const getChoreById = async (chore_id: string): Promise<Chore> => {
    const db = await getDb()
    const chore: unknown[] = await db.select('*').from('chores').where('chore_id', chore_id)

    return choreSchema.parse(chore[0])
};

export const createChore = async (input: CreateChoreInput): Promise<Chore> => {
    const { admin_id, title, status } = input
    const db = await getDb()
    const chore: unknown[] = await db('chores').returning(['chore_id', 'admin_id', 'title', 'description', 'assigned_to', 'deadline', 'value', 'status']).insert({ admin_id, title, status })

    return choreSchema.parse(chore[0])
};


export const choresRepository = { getChores, getChoreById, createChore };

type CreateChoreInput = {
    admin_id: string,
    title: string,
    description?: string,
    assigned_to?: string,
    deadline?: Date,
    value?: string,
    status: Status
}