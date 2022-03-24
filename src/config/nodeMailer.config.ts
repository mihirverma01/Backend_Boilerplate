import log from "loglevel";
import nodemailer from "nodemailer";

const createTestAcc = async () => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    return { transporter, testAccount };
  } catch (error) {
    log.error("error>>>>>>>>>>>>>>", error);
    return error;
  }
};
