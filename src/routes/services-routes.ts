import { Router } from "express";

import { ServicesController } from "@/controllers/services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const servicesRoutes = Router();
const servicesController = new ServicesController();

servicesRoutes.use(verifyUserAuthorization(["admin", "customer"]));
servicesRoutes.get("/", servicesController.index);

servicesRoutes.use(verifyUserAuthorization(["admin"]));
servicesRoutes.post("/", servicesController.create);
servicesRoutes.put("/:id", servicesController.update);
servicesRoutes.patch("/:id", servicesController.updateStatus);

export { servicesRoutes };
