import { choresController } from "../controllers/chores.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getChores = httpHandler(async (req, res) => {
    const { body, status } = await choresController.getChores()
    res.status(status).send(body);
});