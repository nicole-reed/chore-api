import { HttpResponse } from "../models/httpResponse";
import { choresRepository } from "../repositories/chores.repository";

export const getChores = async (): Promise<HttpResponse> => {
    const chores = await choresRepository.getChores();

    return {
        body: chores,
        status: 200
    };

};

export const choresController = { getChores };