import { HttpResponse } from "../models/httpResponse";
import { adminsRepository } from "../repositories/admins.repository";

export const getAdmins = async (): Promise<HttpResponse> => {
    const admins = await adminsRepository.getAdmins();

    return {
        body: admins,
        status: 200
    };
};

export const adminsController = { getAdmins };