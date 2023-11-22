import { getDb } from "../database/knex.service"

export const getChoreLists = async () => {
    const db = await getDb()
    const choreLists = await db.select('*').from('chore_lists')

    return choreLists
}