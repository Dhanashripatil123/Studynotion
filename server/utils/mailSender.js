const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");


dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("🔥 SENDGRID MAILSENDER LOADED");
exports.mailSender = async (to, subject, html) => {
  try {
    console.log("\n========== SENDGRID DEBUG ==========");
    console.log("Recipient:", to);
    console.log("Subject:", subject);

    const msg = {
      to,
      from: process.env.MAIL_FROM,
      subject,
      html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ Email sent successfully");

    return response;
  } catch (error) {
    console.error("\n❌ SENDGRID ERROR:");

    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error.message);
    }

    throw error;
  }
};