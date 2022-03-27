import { Request, Response } from "express";
import db from "../database";
import { validatePassword } from "../helpers/validatePassword.helper";

export const follow = async (req: Request, res: Response) => {
  try {
    const currentUser: any = req.user;
    const token: any = req.token;
    const followingId: any = req.body.userId;
    if (!followingId) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const followingUser: any = await db.User.findOne({
      where: {
        id: followingId,
      },
    });
    if (!followingUser) {
      return res.status(400).json({ error: "user doesn't exist" });
    }

    const createConnection: any = await db.Connection.create({
      user_id: currentUser.id,
      follower_id: followingUser.id,
    });
    if (!createConnection) {
      return res
        .status(400)
        .json({ error: "something went wrong while following" });
    }

    return res.status(201).json({ message: "follwoed successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
