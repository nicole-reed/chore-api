import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoresByAdminId = httpHandler(async (req, res) => {
    const { body, status } = await choresController.getChoresByAdminId(req)
    res.status(status).send(body)
});