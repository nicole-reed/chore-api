import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export const getSecret = async (secretName: string): Promise<string> => {
    const client = new SecretManagerServiceClient();

    const [version] = await client.accessSecretVersion({
        name: `projects/choreme/secrets/${secretName}/versions/latest`
    })

    const secretValue = version.payload?.data?.toString();
    if (secretValue) {
        return secretValue
    }

    throw new Error('secret not found')
}