import { HttpResponse } from "../models/httpResponse";
import { usersRepository } from "../repositories/users.repository";

export const getUsers = async (): Promise<HttpResponse> => {
    const users = await usersRepository.getUsers();

    return {
        body: users,
        status: 200
    };
};

export const usersController = { getUsers };