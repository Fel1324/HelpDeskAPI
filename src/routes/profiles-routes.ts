import { Router } from "express";

import { ProfilesController } from "@/controllers/profiles-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const profilesRoutes = Router();
const profilesController = new ProfilesController();

profilesRoutes.use(verifyUserAuthorization(["technician", "customer"]));

profilesRoutes.get("/:id", profilesController.show);
profilesRoutes.put("/:id", profilesController.update);
profilesRoutes.patch("/:id", profilesController.updatePassword);

export { profilesRoutes };