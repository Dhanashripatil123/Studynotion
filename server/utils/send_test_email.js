require('dotenv').config();
const { mailSender } = require('./mailSender');

const to = process.env.TEST_MAIL_TO || process.env.MAIL_USER;
const subject = 'StudyNotion SMTP test';
const body = `<p>This is a test message from StudyNotion server at ${new Date().toISOString()}</p>`;

(async () => {
  try {
    console.log('Attempting to send test email to:', to);
    const info = await mailSender(to, subject, body);
    console.log('mailSender returned:', info);
    try {
      const nodemailer = require('nodemailer');
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log('Preview URL:', preview);
    } catch (e) {
      // ignore
    }
    process.exit(0);
  } catch (err) {
    console.error('Test email failed:', err && (err.stack || err));
    process.exit(2);
  }
})();
