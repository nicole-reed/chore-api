import { getDbConnection } from "./knex.service"

export const getCars = async () => {
    const dbConnection = await getDbConnection()
    const cars = await dbConnection.select('*').from('cars')

    return cars
}