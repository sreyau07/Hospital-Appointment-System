

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {

  console.log("Sending email to:", to);

  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: to,
    subject: subject,
    text: text,
  });

  console.log("Email sent:", result);

};

module.exports = sendEmail;