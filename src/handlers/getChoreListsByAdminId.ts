import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoreListsByAdminId = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.getChoreListsByAdminId(req)
    res.status(status).send(body)
});
