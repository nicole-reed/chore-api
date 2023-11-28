import { choresController } from "../controllers/chores.controller"
import { httpHandler } from "../wrappers/handler.wrapper"

export const updateChore = httpHandler(async (req, res) => {
    const { body, status } = await choresController.updateChore(req)
    res.status(status).send(body)
});