import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChoreById = httpHandler(async (req, res) => {
    const { body, status } = await choresController.getChoreById(req)
    res.status(status).send(body)
});