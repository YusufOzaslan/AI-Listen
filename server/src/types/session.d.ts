import mongoose from "mongoose";
declare module "express-session" {
  interface Session {
    userID?: mongoose.Schema.Types.ObjectId;
  }
}

export {};
