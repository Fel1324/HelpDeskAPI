import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const techniciansRoutes = Router();
const techniciansController = new UsersController()

techniciansRoutes.use(verifyUserAuthorization(["admin"]))

techniciansRoutes.post("/", techniciansController.create)
// techniciansRoutes.get("/", techniciansController.create)

export { techniciansRoutes }
