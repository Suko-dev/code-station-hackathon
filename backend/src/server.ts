import express from "express";

import dbServer from "./shared/typeorm";

dbServer();
const app = express();
app.use(express.json());

export { app };
