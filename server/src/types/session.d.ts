declare module "express-session" {
  interface Session {
    userID?: string;
  }
}

export {};
