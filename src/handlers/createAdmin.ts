import { adminsController } from "../controllers/admins.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const createAdmin = httpHandler(async (req, res) => {
    const { body, status } = await adminsController.createAdmin(req)
    res.status(status).send(body);
});