import { Router } from "express";

import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { TechniciansController } from "@/controllers/technicians-controller";

const techniciansRoutes = Router();
const techniciansController = new TechniciansController()

techniciansRoutes.use(verifyUserAuthorization(["admin"]))

techniciansRoutes.post("/", techniciansController.create)
// techniciansRoutes.get("/", techniciansController.create)

export { techniciansRoutes }
