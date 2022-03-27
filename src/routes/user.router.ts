import express from "express";
import { forgotPassword, login, privateRoute, resetPassword, signup } from "../controllers/auth.controller";
import genrateToken from "../middlewares/genrateToken.middleware";
import validateAuthToken from "../middlewares/validateAuthToken.middleware";
import validatePassword from "../middlewares/validatePass.middleware";

// * ROUTER INITIALIZATION * //
const router = express.Router();

router.post("/signup",genrateToken ,signup);
router.post("/login",genrateToken ,login);
router.post("/forgotPassword" ,forgotPassword);
router.put("/resetPassword",validateAuthToken,resetPassword);
router.get("/private",validateAuthToken,privateRoute);

export default router;
