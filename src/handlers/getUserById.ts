import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getUserById = httpHandler(async (req, res) => {
    const { status, body } = await usersController.getUserById(req)
    res.status(status).send(body);
});