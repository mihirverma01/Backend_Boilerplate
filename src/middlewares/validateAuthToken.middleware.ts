import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../database";

dotenv.config();

const validateAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"];
  const SECRET_KEY: any = process.env.SECRET_KEY;
  try {
    if (!authToken) {
      return res.status(400).json({ message: "invalid auth token" });
    }
    const decodedToken: any = jwt.verify(authToken, SECRET_KEY);

    if (decodedToken) {
      const currentUser: any = await db.User.findOne({
        where: {
          email: decodedToken.email,
        },
      });
      if (!currentUser) {
        return res.status(400).json({ message: "user not found" });
      }
      req.user = currentUser;
      req.token = authToken;
      next();
    } else {
      return res.status(400).json({ message: "invalid token" });
    }
  } catch (error) {}
};

export default validateAuthToken;
