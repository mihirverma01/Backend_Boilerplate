import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import log from "loglevel";
import db from "../database";
import bcrypt from "bcrypt";

dotenv.config();

const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body;
    const user: any = await db.User.findOne({
      where: {
        email: email,
      },
    });
    log.info("user>>>>>>>>>>", user);
    const validate = bcrypt.compareSync(password, user.password);
    if (!validate) {
      log.error("password mismatch");
      return res.status(500).json({ error: "password mismatch" });
    }
    next();
  } catch (error: any) {
    log.error("error>>>>>", error);
    return res.status(500).json({ error: error.message });
  }
};

export default validatePassword;
