import { HttpResponse } from "../models/httpResponse";
import { getUserByIdRequestSchema } from "../models/user";
import { usersRepository } from "../repositories/users.repository";

export const getUsers = async (): Promise<HttpResponse> => {
    const users = await usersRepository.getUsers();

    return {
        body: users,
        status: 200
    };
};

export const getUserById = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getUserByIdRequestSchema.parse(request)
    const user_id = validatedRequest.params.user_id
    const user = await usersRepository.getUserById(user_id);

    return {
        body: user,
        status: 200
    };
};

export const usersController = { getUsers, getUserById };