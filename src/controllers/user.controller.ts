import { Request, Response } from "express";
import db from "../database";
import { Op } from "sequelize";
import { validatePassword } from "../helpers/validatePassword.helper";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const token = req.token;
    if (currentUser && token) {
      const allUsers = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        where: {
          id: {
            [Op.not]: currentUser.id,
          },
        },
      });
      if (!allUsers) {
        return res.status(400).json({ error: "Users not found" });
      }
      return res.status(200).json({ data: allUsers });
    }
    return res.status(400).json({ error: "invalid user or token" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const token = req.token;
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "invalid user id" });
    }
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    user.password = undefined;
    return res.status(200).json({ data: user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
