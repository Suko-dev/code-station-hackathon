import express from "express";

import "reflect-metadata";

import { router } from "./routes";
import dbServer from "./shared/typeorm";

import "./shared/container";

dbServer();

const app = express();

app.use(express.json());

app.use(router);

export { app };
