import { Router } from "express";

import { TicketsController } from "@/controllers/tickets-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

ticketsRoutes.get("/", ticketsController.index);
ticketsRoutes.post("/", verifyUserAuthorization(["customer"]), ticketsController.create);

export { ticketsRoutes };
