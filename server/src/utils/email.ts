import nodemailer from "nodemailer";

function _sentEmail(email: string) {
  // let transporter = nodemailer.createTransport({
  //   host: appEnv.EMAIL_HOST, // account.smtp.host,
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: appEnv.EMAIL_USER,
  //     pass: appEnv.EMAIL_PASS
  //   }
  // });
  //
  // // Message object
  // let message = {
  //   from: "Shorttiee team <sender@example.com>",
  //   to: `Recipient <${email}>`,
  //   subject: "Welcome Shorttiee ✔",
  //   // text: "",
  //   html: "<p><b>Hello</b> team 😉!</br></p>"
  // };
  //
  // transporter.sendMail(message, (err, info) => {
  //   if (err) {
  //     console.log("Error occurred. " + err.message);
  //     return process.exit(1);
  //   }
  //
  //   console.log("Message sent: %s", info.messageId);
  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // });
}
