import { adminSchema, getAdminByIdRequestSchema } from "../models/admin";
import { HttpResponse } from "../models/httpResponse";
import { adminsRepository } from "../repositories/admins.repository";

export const getAdmins = async (): Promise<HttpResponse> => {
    const admins = await adminsRepository.getAdmins();

    return {
        body: admins,
        status: 200
    };
};

export const getAdminById = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getAdminByIdRequestSchema.parse(request);
    const admin_id = validatedRequest.params.admin_id
    const admin = await adminsRepository.getAdminById(admin_id);

    return {
        body: admin,
        status: 200
    };
};

export const adminsController = { getAdmins, getAdminById };