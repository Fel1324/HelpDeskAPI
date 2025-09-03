import { Router } from "express";

import { ProfilesController } from "@/controllers/profiles-controller";

const profilesRoutes = Router();
const profilesController = new ProfilesController();

profilesRoutes.get("/:id", profilesController.show);
// profilesRoutes.put("/:id", profilesController.update);
profilesRoutes.patch("/:id", profilesController.updatePassword);

export { profilesRoutes };