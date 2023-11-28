import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const updateChoreList = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.updateChoreList(req)
    res.status(status).send(body)
});