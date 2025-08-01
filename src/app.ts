import express from "express";

import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";
import { ensureUserAuthentication } from "./middlewares/ensure-user-authentication";

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandling)

export { app }
