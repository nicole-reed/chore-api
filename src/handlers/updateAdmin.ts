import { adminsController } from "../controllers/admins.controller";
import { httpHandler } from "../wrappers/handler.wrapper";

export const updateAdmin = httpHandler(async (req, res) => {
    const { body, status } = await adminsController.updateAdmin(req)
    res.status(status).send(body)
})