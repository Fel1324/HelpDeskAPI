import { Router } from "express";

import { ensureUserAuthentication } from "@/middlewares/ensure-user-authentication";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { techniciansRoutes } from "./technicians-routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes)

techniciansRoutes.use(ensureUserAuthentication)

routes.use("/technicians", techniciansRoutes)

export { routes };
