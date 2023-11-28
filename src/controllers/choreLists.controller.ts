
import { createChoreListRequestSchema, getChoreListByIdRequestSchema, updateChoreListRequestSchema } from "../models/choreList";
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
    };
};

export const createChoreList = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = createChoreListRequestSchema.parse(request)
    const input = {
        admin_id: validatedRequest.body.admin_id,
        title: validatedRequest.body.title
    }
    const choreList = await choreListsRepository.createChoreList(input)

    return {
        body: choreList,
        status: 200
    };
};

export const updateChoreList = async (request: unknown): Promise<HttpResponse> => {
    const validatedRequest = updateChoreListRequestSchema.parse(request)
    const chore_list_id = validatedRequest.params.chore_list_id
    const input = {
        title: validatedRequest.body.title,
        assigned_to: validatedRequest.body.assigned_to,
        deadline: validatedRequest.body.deadline,
        value: validatedRequest.body.value,
        notes: validatedRequest.body.notes,
        complete: validatedRequest.body.complete
    }
    const choreList = await choreListsRepository.updateChoreList(chore_list_id, input)

    return {
        body: choreList,
        status: 200
    };
};

export const choreListsController = { getChoreLists, getChoreListById, createChoreList, updateChoreList };