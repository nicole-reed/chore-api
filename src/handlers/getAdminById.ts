import { adminsController } from "../controllers/admins.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const getAdminById = httpHandler(async (req, res) => {
    const { body, status } = await adminsController.getAdminById(req)
    res.status(status).send(body);
});