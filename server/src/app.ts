import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { v1Router } from "./routes";
import { appConfig } from "./configs";
import { ENodeEnvironment } from "./types";
import { errorConverter } from "./middlewares";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cors());
app.use("/v1", v1Router);
app.all("*", (req, res) => {
  res.status(404).send("404");
});
app.use(errorConverter);
export { app };
