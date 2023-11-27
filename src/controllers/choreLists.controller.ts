
import { getChoreListByIdRequestSchema } from "../models/choreList";
import { HttpResponse } from "../models/httpResponse";
import { choreListsRepository } from "../repositories/choreLists.repository";


export const getChoreLists = async (): Promise<HttpResponse> => {
    const choreLists = await choreListsRepository.getChoreLists();

    return {
        body: choreLists,
        status: 200
    };
};

export const getChoreListById = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = getChoreListByIdRequestSchema.parse(request)
    const chore_list_id = validatedRequest.params.chore_list_id
    const choreList = await choreListsRepository.getChoreListById(chore_list_id)

    return {
        body: choreList,
        status: 200
    }
}

export const choreListsController = { getChoreLists, getChoreListById };