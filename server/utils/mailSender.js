const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

let cachedTransporter = null;

// Create transporter
async function createTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  console.log("========== MAIL CONFIG ==========");
  console.log("MAIL_USER:", process.env.MAIL_USER ? "SET" : "NOT SET");
  console.log("MAIL_PASS:", process.env.MAIL_PASS ? "SET" : "NOT SET");
  console.log("=================================");

  cachedTransporter = transporter;

  return transporter;
}

// Send Mail Function
exports.mailSender = async (to, subject, html) => {
  try {
    console.log("\n========== MAIL SENDER DEBUG ==========");
    console.log("Recipient:", to);
    console.log("Subject:", subject);

    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    };

    console.log("Sending mail...");

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("\n❌ MAIL SENDER ERROR:");
    console.error(error);

    throw error;
  }
};