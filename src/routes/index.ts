import { Router } from "express";


import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { techniciansRoutes } from "./technicians-routes";

import { ensureUserAuthentication } from "@/middlewares/ensure-user-authentication";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes)

routes.use(ensureUserAuthentication)
routes.use("/technicians", techniciansRoutes)

export { routes };
