import { Router } from "express";

import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { TechniciansController } from "@/controllers/technicians-controller";

const techniciansRoutes = Router();
const techniciansController = new TechniciansController();

techniciansRoutes.use(verifyUserAuthorization(["admin"]));

techniciansRoutes.get("/", techniciansController.index);
techniciansRoutes.post("/", techniciansController.create);
techniciansRoutes.put("/:id", techniciansController.update);

export { techniciansRoutes };
