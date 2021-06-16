import express from "express";

import { router } from "./routes";
import dbServer from "./shared/typeorm";

dbServer();

const app = express();
app.use(express.json());

app.use(router);

export { app };
