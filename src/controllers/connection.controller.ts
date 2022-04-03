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

    const findConnection: any = await db.Connection.findOne({
      where: {
        user_id: currentUser.id,
        followed_id: followingUser.id,
      },
    });

    if (findConnection) {
      return res.status(400).json({ error: "already followed" });
    }

    const createConnection: any = await db.Connection.create({
      user_id: currentUser.id,
      followed_id: followingUser.id,
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

export const unfollow = async (req: Request, res: Response) => {
  try {
    const currentUser: any = req.user;
    const token: any = req.token;
    const unFollowId: any = req.body.userId;
    if (!unFollowId) {
      return res.status(400).json({ message: "Invalid Request" });
    }
    const followingUser: any = await db.User.findOne({
      where: {
        id: unFollowId,
      },
    });
    if (!followingUser) {
      return res.status(400).json({ error: "user doesn't exist" });
    }

    const removeConnection: any = await db.Connection.destroy({
      where: {
        user_id: currentUser.id,
        followed_id: followingUser.id,
      },
    });
    if (removeConnection == 0) {
      return res
        .status(400)
        .json({ error: "something went wrong while unfollowing" });
    }

    return res.status(201).json({ message: "unfollwoed successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const allFollowers = async (req: Request, res: Response) => {
  try {
    const currentUser: any = req.user;
    const token: any = req.token;
    const userId: any = req.body.userId;
    const followers = await db.Connection.findAll({
      where: {
        followed_id: currentUser.id,
      },
    });
    if (!followers) {
      return res.status(400).json({ error: "no followers" });
    }
    const resultArray: any = [];

    for (let i = 0; i < followers.length; i++) {
      const element = followers[i];
      const user = await db.User.findOne({
        where: {
          id: element.user_id,
        },
      });
      user.password = undefined;
      resultArray.push(user);
    }

    if (!resultArray) {
      return res
        .status(400)
        .json({ error: "something went wrong finding followers" });
    }
    res.status(200).json({ followers: resultArray });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const allFollowing = async (req: Request, res: Response) => {
  try {
    const currentUser: any = req.user;
    const token: any = req.token;
    const userId = req.body.userId;
    const following = await db.Connection.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!following) {
      return res.status(400).json({ error: "no followings" });
    }
    const resultArray: any = [];

    for (let i = 0; i < following.length; i++) {
      const element = following[i];
      const user = await db.User.findOne({
        where: {
          id: element.followed_id,
        },
      });
      user.password = undefined;
      resultArray.push(user);
    }

    if (!resultArray) {
      return res
        .status(400)
        .json({ error: "something went wrong finding followings" });
    }
    res.status(200).json({ following: resultArray });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
