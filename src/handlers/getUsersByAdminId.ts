import { usersController } from "../controllers/users.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getUsersByAdminId = httpHandler(async (req, res) => {
    const { body, status } = await usersController.getUsersByAdminId(req)
    res.status(status).send(body)
});