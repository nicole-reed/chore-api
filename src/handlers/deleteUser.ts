import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const deleteUser = httpHandler(async (req, res) => {
    const { body, status } = await usersController.deleteUser(req)
    res.status(status).send(body)
});