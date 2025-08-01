import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { ensureUserAuthentication } from "@/middlewares/ensure-user-authentication";

const usersRoutes = Router();
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)

usersRoutes.use(ensureUserAuthentication)
usersRoutes.post("/technician", usersController.create)

export { usersRoutes }
