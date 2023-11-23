import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getUsers = httpHandler(async (req, res) => {
    const { body, status } = await usersController.getUsers();
    res.status(status).send(body);
});