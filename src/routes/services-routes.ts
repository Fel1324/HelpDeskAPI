import { Router } from "express";

import { ServicesController } from "@/controllers/services-controller";
import { AdditionalsServicesController } from "@/controllers/additionals-services-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const servicesRoutes = Router();
const servicesController = new ServicesController();
const additionalsServicesController = new AdditionalsServicesController();

servicesRoutes.post(
  "/additional/:ticketId",
  verifyUserAuthorization(["technician"]),
  additionalsServicesController.create
);

servicesRoutes.get(
  "/",
  verifyUserAuthorization(["admin", "customer"]),
  servicesController.index
);

servicesRoutes.use(verifyUserAuthorization(["admin"]));

servicesRoutes.post("/", servicesController.create);
servicesRoutes.put("/:id", servicesController.update);
servicesRoutes.patch("/:id", servicesController.updateStatus);

export { servicesRoutes };
