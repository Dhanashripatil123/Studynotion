const Razorpay = require('razorpay');
require('dotenv').config();

const keyId = process.env.RAZORPAY_KEY || process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_SECRETE || process.env.RAZORPAY_SECRET || process.env.RAZORPAY_KEY_SECRET;

let instance = null;
if (!keyId || !keySecret) {
	console.warn('Razorpay keys not configured. Payments will be disabled. Set RAZORPAY_KEY and RAZORPAY_SECRETE in .env');
} else {
	try {
		instance = new Razorpay({
			key_id: keyId,
			key_secret: keySecret,
		});
		console.log('Razorpay instance configured');
	} catch (err) {
		console.error('Failed to create Razorpay instance:', err && err.stack ? err.stack : err);
		instance = null;
	}
}

module.exports = { instance };