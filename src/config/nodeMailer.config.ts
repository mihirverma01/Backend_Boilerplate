import nodemailer from "nodemailer";


    export const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: "www.mv15@gmail.com", // generated ethereal user
        pass: "Mv165356505@", // generated ethereal password
      },
    });
