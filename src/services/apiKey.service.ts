import { getSecret } from "./secret.service";

let apiKey: string | undefined

export const getApiKey = async (): Promise<string> => {
    if (!apiKey) {
        apiKey = await getSecret('choreMeApiKey');
    }
    return apiKey
}