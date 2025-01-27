import nodemailer from "nodemailer";
import { appEnv } from "../config/env.config";
import { EmailPayload } from "../config/events";

export function sendEmail(payload: EmailPayload) {
  let transporter = nodemailer.createTransport({
    // host: appEnv.EMAIL_HOST, // account.smtp.host,
    service: appEnv.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: appEnv.EMAIL_USER,
      pass: appEnv.EMAIL_PASS
    }
  });

  // Message object
  let message = {
    from: "Shorttiee team <sender@example.com>",
    to: `Recipient <${payload.email}>`,
    subject: payload.title,
    // text: "",
    html: payload.content
  };

  return new Promise((res, rej) => {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        rej(err);
        return;
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res(nodemailer.getTestMessageUrl(info));
    });
  });
}
