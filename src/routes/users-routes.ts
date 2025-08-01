import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { ensureUserAuthentication } from "@/middlewares/ensure-user-authentication";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const usersRoutes = Router();
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)

usersRoutes.use(ensureUserAuthentication, verifyUserAuthorization(["admin"]))
usersRoutes.post("/technicians", usersController.create)

export { usersRoutes }
