require('dotenv').config();
const { mailSender } = require('./server/utils/mailSender');

(async () => {
  try {
    const info = await mailSender(
      'your@real.email',   // change to your address
      'nodemailer test',
      '<p>hello from test</p>'
    );
    console.log('sendMail result', info);
  } catch (err) {
    console.error('send failed', err);
  }
})();