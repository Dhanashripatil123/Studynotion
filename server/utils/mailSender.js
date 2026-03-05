const nodemailer = require('nodemailer');

let cachedTransporter = null;
// default connection timeout in milliseconds (can be overridden with env var)
const CONNECTION_TIMEOUT = process.env.MAIL_CONN_TIMEOUT ? parseInt(process.env.MAIL_CONN_TIMEOUT, 10) : 10000;

async function createTransporter() {
    if (cachedTransporter) return cachedTransporter;

    const host = process.env.MAIL_HOST;
    const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 465;
    const secure = (typeof process.env.MAIL_SECURE !== 'undefined')
        ? process.env.MAIL_SECURE === 'true'
        : port === 465;

    let config;
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        const testAccount = await nodemailer.createTestAccount();
        config = {
            host: 'smtp.ethereal.email',
            port: 456,
            secure: true,
            auth: { user: testAccount.user, pass: testAccount.pass },
            connectionTimeout: CONNECTION_TIMEOUT,
            socketTimeout: CONNECTION_TIMEOUT,
        };
        console.log('⚠️ Ethereal account created:', testAccount.user);
    } else if (process.env.MAIL_SERVICE) {
        config = {
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            connectionTimeout: CONNECTION_TIMEOUT,
            socketTimeout: CONNECTION_TIMEOUT,
        };
        console.log('Using service:', process.env.MAIL_SERVICE);
    } else {
        config = {
            host: host || 'smtp.gmail.com',
            port,
            secure,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            connectionTimeout: CONNECTION_TIMEOUT,
            socketTimeout: CONNECTION_TIMEOUT,
        };
        console.log('Using host/port config');
    }

    console.log('Mail transporter config:', config.host || config.service, config.port || 'N/A');
    const transporter = nodemailer.createTransport(config);
    try {
        await transporter.verify();
        console.log('✅ Mail transporter verified');
    } catch (verifyErr) {
        console.error('Transporter verification failed:', verifyErr && verifyErr.message ? verifyErr.message : verifyErr);
        throw verifyErr;
    }
    cachedTransporter = transporter;
    return transporter;
}

exports.mailSender = async(to, subject, html) => {
    try {
        console.log('\n========== MAIL SENDER DEBUG ==========');
        console.log('- MAIL_HOST:', process.env.MAIL_HOST || 'not set');
        console.log('- MAIL_PORT:', process.env.MAIL_PORT || 'not set');
        console.log('- MAIL_USER:', process.env.MAIL_USER ? 'SET' : 'NOT SET');
        console.log('- MAIL_PASS:', process.env.MAIL_PASS ? 'SET' : 'NOT SET');
        console.log('- MAIL_SERVICE:', process.env.MAIL_SERVICE || 'not set');
        console.log('- Recipient email:', to);
      
        const transporter = await createTransporter();

        console.log('\nAttempting to send email...');
        const mailOptions = {
            from: process.env.MAIL_USER || 'no-reply@studynotion.local',
            to,
            subject,
            html,
        };

        console.log('Mail options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.html?.substring(0, 100) + '...',
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Mail info:', {
            messageId: info.messageId,
            response: info.response,
            accepted: info.accepted,
            rejected: info.rejected,
            envelope: info.envelope,
        });

        if (info.accepted.length === 0) {
            throw new Error('SMTP server rejected recipient');
        }

        if (info.envelope && info.envelope.from.includes('ethereal')) {
            const preview = nodemailer.getTestMessageUrl(info);
            if (preview) console.log('📧 Preview URL:', preview);
        }

        console.log('========== MAIL SENDER SUCCESS ==========');
        return info;
    } catch (error) {
        console.error('\n❌ MAIL SENDER ERROR:');
        console.error(error);
        throw error;
    }
};