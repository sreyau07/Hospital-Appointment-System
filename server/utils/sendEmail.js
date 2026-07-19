const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  console.log("Creating transporter...");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("Sending email to:", to);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  console.log("Email sent successfully");
};

module.exports = sendEmail;