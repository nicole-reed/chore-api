import { HttpResponse } from "../models/httpResponse";
import { choreListsRepository } from "../repositories/choreLists.repository";


export const getChoreLists = async (): Promise<HttpResponse> => {
    const choreLists = await choreListsRepository.getChoreLists();

    return {
        body: choreLists,
        status: 200
    };
};

export const choreListsController = { getChoreLists };