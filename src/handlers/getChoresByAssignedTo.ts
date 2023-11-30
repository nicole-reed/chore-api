import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoresByAssignedTo = httpHandler(async (req, res) => {
    const { body, status } = await choresController.getChoresByAssignedTo(req)
    res.status(status).send(body)
});