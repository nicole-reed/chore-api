import { z } from "zod"
import { getDb } from "../database/knex.service"
import { ChoreList, choreListSchema } from "../models/choreList"

export const getChoreLists = async (): Promise<ChoreList[]> => {
    const db = await getDb()
    const choreLists: unknown = await db.select('*').from('chore_lists')

    return z.array(choreListSchema).parse(choreLists)
}

export const choreListsRepository = { getChoreLists };