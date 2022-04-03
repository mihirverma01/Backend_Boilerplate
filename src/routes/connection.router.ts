
import express from "express";
import { allFollowers, allFollowing, follow, unfollow } from "../controllers/connection.controller";
import validateAuthToken from "../middlewares/validateAuthToken.middleware";

const router = express.Router();

router.post("/follow",validateAuthToken ,follow);
router.delete("/unfollow",validateAuthToken ,unfollow);
router.get("/followers",validateAuthToken ,allFollowers);
router.get("/following",validateAuthToken ,allFollowing);

export default router;