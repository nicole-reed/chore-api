import { choreListsController } from "../controllers/choreLists.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoreLists = httpHandler(async (req, res) => {
    const { body, status } = await choreListsController.getChoreLists()
    res.status(status).send(body);
});