import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";

// load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const capturePayment = async (courses = [], token) => {
  if (!token) throw new Error('Not authenticated');
  const base = import.meta.env.VITE_BASE_URL;
  try {
    const response = await apiConnector("POST", `${base}/payment/capturePayment`, { courses }, { Authorization: `Bearer ${token}` });
    // `apiConnector` returns the response payload ({ success, message, data/order, ... })
    // so return it directly to callers.
    return response; // { success, order, amount, currency }
  } catch (err) {
    // apiConnector already logs; normalize return
    const payload = err?.response?.data || { success: false, message: err.message };
    return payload;
  }
}

export const openRazorpayCheckout = async (order, userDetails = {}, token, courses = [], navigate = () => {}, dispatch = () => {}, successCallback = null) => {
  // initialize checkout
  const toastId = toast.loading('Initializing payment...');
  // ensure client-side Razorpay key is present before loading checkout
  const clientKey = import.meta.env.VITE_RAZORPAY_KEY;
  if (!clientKey) {
    const msg = 'Client Razorpay key missing (VITE_RAZORPAY_KEY). Please set it in frontend env.';
    console.error('openRazorpayCheckout error:', msg);
    try {
      const debugPayload = { type: 'openCheckoutError', data: { message: msg } };
      window.STN_PAYMENT_DEBUG = debugPayload;
      window.dispatchEvent(new CustomEvent('stn-payment-debug', { detail: debugPayload }));
    } catch (e) {  
    toast.error(msg);
    return { success: false, message: msg };
  }
  }

  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    toast.error('Razorpay SDK failed to load. Check your internet connection.');
    toast.dismiss(toastId);
    return { success: false, message: 'Razorpay SDK failed to load' };
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: String(order.amount),
    currency: order.currency || 'INR',
    name: 'Studynotion',
    description: 'Course Purchase',
    order_id: order.id || order.order_id || order._id,
    image: '/logo.png',
    prefill: {
      name: `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim(),
      email: userDetails.email || '',
      contact: userDetails.contactNumber || '',
    },
    handler: async function (response) {
      // on success: verify signature on server
      try {
        const base = import.meta.env.VITE_BASE_URL;
        const verifyRes = await apiConnector('POST', `${base}/payment/verifySignature`, { razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, courses }, { Authorization: `Bearer ${token}` });
        // apiConnector returns the payload directly
        if (verifyRes?.success) {
          toast.success('Payment successful and verified');
          // call success callback so caller can refresh UI
          if (typeof successCallback === 'function') {
            try { successCallback(verifyRes); } catch (cbErr) { console.error('successCallback error', cbErr); }
          }
        } else {
          toast.error(verifyRes?.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('verifySignature error', err);
        toast.error('Payment verification error');
      }
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on('payment.failed', function (response) {
    console.error('Payment failed', response);
    toast.error('Payment failed');
  });

  toast.dismiss(toastId);
  return { success: true };
}

// Payment helper for enrolling/checkout by course(s)
export const byCourse = (token, courseIds = [], navigate, dispatch, user) => {
  // If user is not authenticated, redirect to login
  if (!token) {
    if (typeof navigate === 'function') navigate('/login');
    return { success: false, message: 'Not authenticated' };
  }

  // Placeholder: when token exists, normally start payment/enroll flow.
  // For now, simply navigate to cart or dashboard as a fallback.
  if (typeof navigate === 'function') {
    // fallback: navigate to cart page
    navigate('/dashboard/cart');
  }

  return { success: true };
};

export default byCourse
