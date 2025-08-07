import { Router } from "express";

import { CustomersController } from "@/controllers/customers-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const customersRoutes = Router();
const customersController = new CustomersController();

customersRoutes.use(verifyUserAuthorization(["admin"]));

customersRoutes.get("/", customersController.index);
customersRoutes.put("/:id", customersController.update);

export { customersRoutes };
