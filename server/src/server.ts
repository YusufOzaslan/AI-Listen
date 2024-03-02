import { Express } from "express";
import http from "http";
import { app } from "./app";

const createHttpServer = (app: Express) => {
  console.log("istek")
  return http.createServer(app);
};

const server = createHttpServer(app);

export { server };
