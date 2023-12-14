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

export const getChoresByAdminId = async (input: GetChoresByAdminIdInput): Promise<Chore[]> => {
    const { admin_id, assigned_to, deadline, status } = input
    let queryString = 'SELECT * FROM chores WHERE admin_id = ?'
    const bindings = [admin_id]
    if (assigned_to) {
        queryString += ' AND assigned_to = ?'
        bindings.push(assigned_to)
    }
    if (status) {
        queryString += ' AND status = ?'
        bindings.push(status)
    }
    if (deadline) {
        queryString += ' AND deadline = ?'
        bindings.push(deadline)
    }

    const db = await getDb()
    const rawQueryResult: unknown = await db.raw(queryString, bindings)
    const { rows } = z.object({ rows: z.array(choreSchema) }).parse(rawQueryResult)
    return rows
};

export const getChoresByAssignedTo = async (input: GetChoresByAssignedToInput): Promise<Chore[]> => {
    const { user_id, status, deadline } = input
    let queryString = 'SELECT * FROM chores WHERE assigned_to = ?'
    const bindings = [user_id]
    if (status) {
        queryString += ' AND status = ?'
        bindings.push(status)
    }
    if (deadline) {
        queryString += ' AND deadline = ?'
        bindings.push(deadline)
    }

    const db = await getDb()
    const rawQueryResult: unknown = await db.raw(queryString, bindings)
    const { rows } = z.object({ rows: z.array(choreSchema) }).parse(rawQueryResult)
    return rows
};

export const createChore = async (input: CreateChoreInput): Promise<Chore> => {
    const { admin_id, title, status } = input
    const db = await getDb()
    const chore: unknown[] = await db('chores')
        .returning(['chore_id', 'admin_id', 'title', 'description', 'assigned_to', 'deadline', 'value', 'status'])
        .insert({ admin_id, title, status })

    return choreSchema.parse(chore[0])
};

export const updateChore = async (chore_id: string, input: UpdateChoreInput): Promise<Chore> => {
    const { title, description, assigned_to, deadline, value, status } = input
    const db = await getDb()
    const chore: unknown[] = await db('chores')
        .where({ chore_id })
        .update({ title, description, assigned_to, deadline, value, status }, ['chore_id', 'admin_id', 'title', 'description', 'assigned_to', 'deadline', 'value', 'status'])

    return choreSchema.parse(chore[0])
};

export const deleteChore = async (chore_id: string): Promise<void> => {
    const db = await getDb()
    await db('chores').where({ chore_id }).del()
};


export const choresRepository = {
    getChores,
    getChoreById,
    createChore,
    updateChore,
    deleteChore,
    getChoresByAdminId,
    getChoresByAssignedTo
};

type CreateChoreInput = {
    admin_id: string,
    title: string,
    description?: string,
    assigned_to?: string,
    deadline?: string,
    value?: string,
    status: Status
}

type UpdateChoreInput = {
    title: string,
    description?: string,
    assigned_to?: string,
    deadline?: string,
    value?: string,
    status: Status
}

type GetChoresByAssignedToInput = {
    user_id: string,
    status?: Status,
    deadline?: string
}

type GetChoresByAdminIdInput = {
    admin_id: string,
    assigned_to?: string,
    status?: Status,
    deadline?: string
}