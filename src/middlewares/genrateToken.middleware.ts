import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import log from "loglevel";

dotenv.config();

const genrateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, email } = req.body;
    const SECRET_KEY: any = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        firstName: firstName,
        email: email,
      },
      SECRET_KEY
    );
    log.info("token created successfullt>>>>>>>>>>");
    req.token = token;
    next();
  } catch (error: any) {
    log.error("error>>>>>", error);
    return res.status(500).json({ error: error.message });
  }
};

export default genrateToken;