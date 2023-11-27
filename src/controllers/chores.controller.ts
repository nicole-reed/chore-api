import { createChoreRequestSchema, getChoreByIdRequestSchema } from "../models/chore";
import { HttpResponse } from "../models/httpResponse";
import { choresRepository } from "../repositories/chores.repository";

export const getChores = async (): Promise<HttpResponse> => {
    const chores = await choresRepository.getChores();

    return {
        body: chores,
        status: 200
    };

};

export const getChoreById = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getChoreByIdRequestSchema.parse(request)
    const chore_id = validatedRequest.params.chore_id
    const chore = await choresRepository.getChoreById(chore_id)

    return {
        body: chore,
        status: 200
    };
};

export const createChore = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = createChoreRequestSchema.parse(request)
    const input = {
        admin_id: validatedRequest.body.admin_id,
        title: validatedRequest.body.title,
        status: validatedRequest.body.status
    }
    const chore = await choresRepository.createChore(input)

    return {
        body: chore,
        status: 200
    }
}

export const choresController = { getChores, getChoreById, createChore };