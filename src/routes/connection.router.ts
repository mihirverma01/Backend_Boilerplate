
import express from "express";
import { follow } from "../controllers/connection.controller";
import validateAuthToken from "../middlewares/validateAuthToken.middleware";

const router = express.Router();

router.post("/follow",validateAuthToken ,follow);

export default router;