import * as dotenv from "dotenv";
dotenv.config();

import { routes } from "./routes";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware";

const server = express();

server.use(express.json());

server.use("/api", routes);
server.use(errorMiddleware.errorHandler);

server.listen(8000, () => {
  console.log("API FUNFANTE 🎉🎉🎉🎉🎉");
});
