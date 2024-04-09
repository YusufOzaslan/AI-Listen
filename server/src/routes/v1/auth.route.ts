import express from "express";
import { validate } from "../../middlewares";
import { authController } from "../../controllers";
import { authValidation } from "../../validations";

const router = express.Router();

router.post("/sign-up", validate(authValidation.signUp), authController.signUp);

router.post("/sign-in", validate(authValidation.signIn), authController.signIn);

router.delete("/sign-out", authController.signOut);

router.get('/refresh', authController.refresh);

export { router as authRouter };
