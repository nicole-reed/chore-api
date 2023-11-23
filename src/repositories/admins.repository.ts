import { getDb } from "../database/knex.service"
import { Admin, adminSchema } from "../models/admin"
import { z } from "zod";


export const getAdmins = async (): Promise<Admin[]> => {
    const db = await getDb()
    const admins: unknown = await db.select('*').from('admins')

    return z.array(adminSchema).parse(admins)
}

export const adminsRepository = { getAdmins };