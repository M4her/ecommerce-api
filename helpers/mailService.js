require("dotenv").config();
const nodemailer = require("nodemailer");
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.Mail,
     pass: process.env.Google,
  },
});



const mailSender = async ({ email, subject, template }) => {
  try {
    await transporter.sendMail({
      from: '"E-Commerce Team" <team@ecommerce.com>',
      to: email,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};

module.exports = { mailSender };
