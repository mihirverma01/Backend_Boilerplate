import { Request, Response } from "express";
import log from "loglevel";
import { createTestAccount } from "nodemailer";
import db from "../database";
import { validatePassword } from "../helpers/validatePassword.helper";
import nodemailer from "nodemailer";
import { transporter } from "../config/nodeMailer.config";

// let transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth: {
//     user: "investorkenwilliams@gmail.com", // generated ethereal user
//     pass: "investorkenwilliams@gmail.com", // generated ethereal password
//   },
// });

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const token: any = req.token;
    //* FIND USER *//
    let user: Object = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      log.warn("user already exist>>>>>>", user);
      return res.status(402).json({ message: "user exist" });
    }

    //* CREATE USER *//
    let createUser = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    if (createUser) {
      log.info("user created>>>>>>", createUser);
      return res.status(201).json({
        message: "user created successfully",
        userData: createUser,
        token: token,
      });
    }
  } catch (error: any) {
    log.error("error>>>>>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token: any = req.token;
    const user: any = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      log.warn("user doesn't exist>>>>>>");
      return res.status(402).json({ message: "user doesn't exist" });
    }
    const isValidate = await validatePassword(password, user.password);
    if (!isValidate) {
      log.warn("invalid username password>>>>>>");
      return res.status(402).json({ message: "Invalid password" });
    }
    // user.password = undefined;
    return res.status(402).json({ user: user, token: token });
  } catch (error: any) {
    log.error("error>>>>>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    await transporter.sendMail({
      from: "investorkenwilliams@gmail.com", // sender address
      to: "mihirv7781@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const newPassword = req.body.password;
    const user = await db.User.update(
      {
        password: newPassword,
      },
      {
        where: {
          email: req.user.email,
        },
      }
    );
    req.user.save();
    return res
      .status(201)
      .json({ message: "updated successfully", user: user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const privateRoute = async (req: Request, res: Response) => {
  const { user, token } = req;
  try {
    res.json({ user: user, token: token });
  } catch (error: any) {
    log.error("error>>>>>", error);
    return res.status(500).json({ error: error.message });
  }
};
