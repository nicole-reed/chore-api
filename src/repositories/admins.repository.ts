import { getDb } from "../database/knex.service"
import { Admin, adminSchema, createAdminRequestSchema } from "../models/admin"
import { z } from "zod";


export const getAdmins = async (): Promise<Admin[]> => {
    const db = await getDb()
    const admins: unknown = await db.select('*').from('admins')

    return z.array(adminSchema).parse(admins)
}


export const getAdminById = async (admin_id: string): Promise<Admin> => {
    const db = await getDb()
    const admin: unknown[] = await db.select('*').from('admins').where('admin_id', admin_id)

    return adminSchema.parse(admin[0])
}

export const createAdmin = async (name: string, email: string): Promise<Admin> => {
    const db = await getDb()
    const admin: unknown[] = await db('admins').returning(['admin_id', 'name', 'email']).insert({ name, email })

    return adminSchema.parse(admin[0])
}

export const adminsRepository = { getAdmins, getAdminById, createAdmin };