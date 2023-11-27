import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const createChore = httpHandler(async (req, res) => {
    const { body, status } = await choresController.createChore(req)
    res.status(status).send(body)
});