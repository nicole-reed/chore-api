import { z } from "zod"
import { getDb } from "../database/knex.service"
import { ChoreList, choreListSchema } from "../models/choreList"

export const getChoreLists = async (): Promise<ChoreList[]> => {
    const db = await getDb()
    const choreLists: unknown = await db.select('*').from('chore_lists')

    return z.array(choreListSchema).parse(choreLists)
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
}

export const choreListsRepository = { getChoreLists, getChoreListById, createChoreList };

type CreateChoreListInput = {
    admin_id: string,
    title: string,
    assigned_to?: string,
    deadline?: Date,
    value?: string,
    notes?: string,
    complete?: boolean
}