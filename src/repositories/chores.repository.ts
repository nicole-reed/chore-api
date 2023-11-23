import { z } from "zod"
import { getDb } from "../database/knex.service"
import { Chore, choreSchema } from "../models/chore"

export const getChores = async (): Promise<Chore[]> => {
    const db = await getDb()
    const chores: unknown = await db.select('*').from('chores')

    return z.array(choreSchema).parse(chores)
}

export const choresRepository = { getChores };