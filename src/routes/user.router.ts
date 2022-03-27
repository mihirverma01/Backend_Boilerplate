import express from "express";
import { forgotPassword, login, privateRoute, resetPassword, signup } from "../controllers/auth.controller";
import { getAllUsers, getUser } from "../controllers/user.controller";
import genrateToken from "../middlewares/genrateToken.middleware";
import validateAuthToken from "../middlewares/validateAuthToken.middleware";
import validatePassword from "../middlewares/validatePass.middleware";

// * ROUTER INITIALIZATION * //
const router = express.Router();

router.post("/signup",genrateToken ,signup);
router.post("/login",genrateToken ,login);
router.post("/forgotPassword" ,forgotPassword);
router.post("/resetPassword",validateAuthToken,resetPassword);
router.get("/private",validateAuthToken,privateRoute);
router.get("/users",validateAuthToken,getAllUsers);
router.get("/user",validateAuthToken,getUser);

export default router;
