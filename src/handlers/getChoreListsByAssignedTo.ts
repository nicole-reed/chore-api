import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoreListsByAssignedTo = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.getChoreListsByAssignedTo(req)
    res.status(status).send(body)
});