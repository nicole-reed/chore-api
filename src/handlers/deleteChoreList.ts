import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const deleteChoreList = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.deleteChoreList(req)
    res.status(status).send(body)
});