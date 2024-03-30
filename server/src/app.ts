import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { r1Router } from "./routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cors());
app.use("/r1", r1Router);
app.all("*", (req, res) => {
  res.status(404).send("404");
});

export { app };
