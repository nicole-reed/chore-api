import { z } from "zod"
import { getDb } from "../database/knex.service"
import { ChoreList, choreListSchema } from "../models/choreList"

export const getChoreLists = async (): Promise<ChoreList[]> => {
    const db = await getDb()
    const choreLists: unknown = await db.select('*').from('chore_lists')

    return z.array(choreListSchema).parse(choreLists)
};

export const getChoreListsByAdminId = async (input: GetChoresListsByAdminIdInput): Promise<ChoreList[]> => {
    const { admin_id, assigned_to, deadline, complete } = input
    let queryString = 'SELECT * FROM chore_lists WHERE admin_id = ?'
    const bindings = [admin_id]
    if (assigned_to) {
        queryString += ' AND assigned_to = ?'
        bindings.push(assigned_to)
    }
    if (deadline) {
        queryString += ' AND deadline = ?'
        bindings.push(deadline)
    }
    if (complete) {
        queryString += ' AND complete = ?'
        bindings.push(complete)
    }
    const db = await getDb()
    const rawQueryResult: unknown = await db.raw(queryString, bindings)
    const { rows } = z.object({ rows: z.array(choreListSchema) }).parse(rawQueryResult)
    return rows
};

export const getChoreListsByAssignedTo = async (input: GetChoresListsByAssignedToInput): Promise<ChoreList[]> => {
    const { user_id, deadline, complete } = input
    let queryString = 'SELECT * FROM chore_lists WHERE assigned_to = ?'
    const bindings = [user_id]
    if (deadline) {
        queryString += ' AND deadline = ?'
        bindings.push(deadline)
    }
    if (complete) {
        queryString += ' AND complete = ?'
        bindings.push(complete)
    }
    const db = await getDb()
    const rawQueryResult: unknown = await db.raw(queryString, bindings)
    const { rows } = z.object({ rows: z.array(choreListSchema) }).parse(rawQueryResult)
    return rows
};

export const getChoreListById = async (chore_list_id: string): Promise<ChoreList> => {
    const db = await getDb()
    const choreList: unknown[] = await db.select('*').from('chore_lists').where('chore_list_id', chore_list_id)

    return choreListSchema.parse(choreList[0])
};

export const createChoreList = async (input: CreateChoreListInput): Promise<ChoreList> => {
    const { admin_id, title } = input
    const db = await getDb()
    const choreList: unknown[] = await db('chore_lists').returning(['chore_list_id', 'admin_id', 'title', 'assigned_to', 'deadline', 'value', 'notes', 'complete']).insert({ admin_id, title })

    return choreListSchema.parse(choreList[0])
};

export const updateChoreList = async (chore_list_id: string, input: UpdateChoreListInput): Promise<ChoreList> => {
    const { title, assigned_to, deadline, value, notes, complete } = input
    const db = await getDb()
    const choreList: unknown[] = await db('chore_lists')
        .where({ chore_list_id })
        .update({ title, assigned_to, deadline, value, notes, complete }, ['chore_list_id', 'admin_id', 'title', 'assigned_to', 'deadline', 'value', 'notes', 'complete'])

    return choreListSchema.parse(choreList[0])
};

export const deleteChoreList = async (chore_list_id: string): Promise<void> => {
    const db = await getDb()
    await db('chore_lists').where({ chore_list_id }).del()
};

export const choreListsRepository = { getChoreLists, getChoreListById, createChoreList, updateChoreList, deleteChoreList, getChoreListsByAdminId, getChoreListsByAssignedTo };

type CreateChoreListInput = {
    admin_id: string,
    title: string,
    assigned_to?: string,
    deadline?: string,
    value?: string,
    notes?: string,
    complete?: boolean
}

type UpdateChoreListInput = {
    title: string,
    assigned_to?: string,
    deadline?: string,
    value?: string,
    notes?: string,
    complete?: boolean
}

type GetChoresListsByAdminIdInput = {
    admin_id: string,
    assigned_to?: string,
    deadline?: string,
    complete?: string
}

type GetChoresListsByAssignedToInput = {
    user_id: string,
    deadline?: string,
    complete?: string
}