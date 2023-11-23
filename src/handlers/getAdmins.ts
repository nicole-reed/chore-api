import { adminsController } from "../controllers/admins.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getAdmins = httpHandler(async (req, res) => {
    const { body, status } = await adminsController.getAdmins()
    res.status(status).send(body);
});