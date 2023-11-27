import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoreListById = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.getChoreListById(req)
    res.status(status).send(body)
});