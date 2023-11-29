import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const deleteChore = httpHandler(async (req, res) => {
    const { body, status } = await choresController.deleteChore(req)
    res.status(status).send(body)
});