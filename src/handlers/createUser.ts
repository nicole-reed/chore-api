import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const createUser = httpHandler(async (req, res) => {
    const { body, status } = await usersController.createUser(req)
    res.status(200).send(body)
});