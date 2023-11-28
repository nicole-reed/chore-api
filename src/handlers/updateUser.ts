import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const updateUser = httpHandler(async (req, res) => {
    const { body, status } = await usersController.updateUser(req)
    res.status(status).send(body)
});