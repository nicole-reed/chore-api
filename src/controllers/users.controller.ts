import { HttpResponse } from "../models/httpResponse";
import { createUserRequestSchema, deleteUserRequestSchema, getUserByIdRequestSchema, getUsersByAdminIdRequestSchema, updateUserRequestSchema } from "../models/user";
import { usersRepository } from "../repositories/users.repository";

export const getUsers = async (): Promise<HttpResponse> => {
    const users = await usersRepository.getUsers();

    return {
        body: users,
        status: 200
    };
};

export const getUsersByAdminId = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getUsersByAdminIdRequestSchema.parse(request)
    const admin_id = validatedRequest.params.admin_id
    const users = await usersRepository.getUsersByAdminId(admin_id)

    return {
        body: users,
        status: 200
    }
}

export const getUserById = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getUserByIdRequestSchema.parse(request)
    const user_id = validatedRequest.params.user_id
    const user = await usersRepository.getUserById(user_id);

    return {
        body: user,
        status: 200
    };
};

export const createUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = createUserRequestSchema.parse(request)
    const { admin_id, name, email } = validatedRequest.body
    const user = await usersRepository.createUser(admin_id, name, email)

    return {
        body: user,
        status: 200
    };
};

export const updateUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = updateUserRequestSchema.parse(request)
    const { name, email } = validatedRequest.body
    const user_id = validatedRequest.params.user_id

    const user = await usersRepository.updateUser(user_id, name, email)

    return {
        body: user,
        status: 200
    };
};

export const deleteUser = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = deleteUserRequestSchema.parse(request)
    const user_id = validatedRequest.params.user_id

    await usersRepository.deleteUser(user_id)

    return {
        body: `successfully deleted user: ${user_id}`,
        status: 200
    }
};

export const usersController = { getUsers, getUserById, createUser, updateUser, deleteUser, getUsersByAdminId };