import { getDb } from "../database/knex.service"

export const getUsers = async () => {
    const db = await getDb()
    const users = await db.select('*').from('users')

    return users
}