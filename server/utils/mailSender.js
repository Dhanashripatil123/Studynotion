// const nodemailer = require("nodemailer");

// let cachedTransporter = null;

// // Create transporter
// async function createTransporter() {
//   if (cachedTransporter) {
//     return cachedTransporter;
//   }

//   const config = {
//     host: process.env.MAIL_HOST || "smtp.gmail.com",
//     port: Number(process.env.MAIL_PORT) || 587,
//     secure: false, // true only for port 465
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//     connectionTimeout: 20000,
//     socketTimeout: 20000,
//   };

//   console.log("Mail transporter config:", {
//     host: config.host,
//     port: config.port,
//     user: config.auth.user ? "SET" : "NOT SET",
//   });

//   const transporter = nodemailer.createTransport(config);

//   try {
//     await transporter.verify();
//     console.log("✅ Mail transporter verified");
//   } catch (error) {
//     console.error("❌ Transporter verification failed:", error.message);
//     throw error;
//   }

//   cachedTransporter = transporter;
//   return transporter;
// }

// // Send Mail Function
// exports.mailSender = async (to, subject, html) => {
//   try {
//     console.log("\n========== MAIL SENDER DEBUG ==========");
//     console.log("Recipient:", to);
//     console.log("Subject:", subject);

//     const transporter = await createTransporter();

//     const mailOptions = {
//       from: process.env.MAIL_USER,
//       to: to,
//       subject: subject,
//       html: html,
//     };

//     console.log("Sending mail...");

//     const info = await transporter.sendMail(mailOptions);

//     console.log("✅ Email sent successfully");
//     console.log("Message ID:", info.messageId);
//     console.log("Response:", info.response);

//     return info;
//   } catch (error) {
//     console.error("\n❌ MAIL SENDER ERROR:");
//     console.error(error.message);
//     throw error;
//   }
// };

const sgMail = require("@sendgrid/mail");

// set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.mailSender = async (to, subject, html) => {
  try {

    console.log("\n========== MAIL SENDER DEBUG ==========");
    console.log("Recipient:", to);
    console.log("Subject:", subject);

    const msg = {
      to: to,
      from: process.env.MAIL_FROM, // verified sender email in SendGrid
      subject: subject,
      html: html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ Email sent successfully");
    console.log("SendGrid Response:", response[0].statusCode);

    return response;

  } catch (error) {
    console.error("\n❌ MAIL SENDER ERROR:");
    console.error(error.response?.body || error.message);

    throw error;
  }
};