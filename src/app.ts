import * as dotenv from "dotenv";
dotenv.config();

import { routes } from "./routes";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.use("/api", routes);
app.use(errorMiddleware.errorHandler);

export { app };
