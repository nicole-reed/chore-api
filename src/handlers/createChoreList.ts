import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const createChoreList = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.createChoreList(req)
    res.status(status).send(body)
});