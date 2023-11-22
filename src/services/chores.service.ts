import { getDb } from "../database/knex.service"

export const getChores = async () => {
    const db = await getDb()
    const chores = await db.select('*').from('chores')

    return chores
}