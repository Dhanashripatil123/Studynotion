const nodemailer = require('nodemailer');
require('dotenv').config();

(async () => {
  try {
    const config = process.env.MAIL_SERVICE
      ? { service: process.env.MAIL_SERVICE,
          auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } }
      : { host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT) || 587,
          secure: process.env.MAIL_SECURE === 'true',
          auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } };
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    console.log('SMTP connection OK');
  } catch (err) {
    console.error('SMTP verification failed:', err);
  }
})();