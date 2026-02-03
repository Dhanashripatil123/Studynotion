import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../../common/IconButton'
import { toast } from 'react-hot-toast'
import { capturePayment, openRazorpayCheckout, byCourse } from '../../../../services/operations/paymentAPI'
import { resetCart } from '../../../../slices/cartSlice'

const RenderTotalAmount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart = [], total = 0 } = useSelector((state) => state.cart || {});
    const token = useSelector((state) => state.auth?.token);
    const profileUser = useSelector((state) => state.profile?.user);

    const handleBuyCourse = async () => {
      if (!cart || !cart.length) {
        toast.error('Cart is empty');
        return;
      }
      const courseIds = cart.map(c => c._id || c.courseId || c.id).filter(Boolean);
      if (!token) {
        try { byCourse(token, courseIds, navigate, dispatch, profileUser); } catch (e) { console.error(e); }
        return;
      }

      try {
        const cap = await capturePayment(courseIds, token);
        if (!cap) {
          toast.error('Failed to initiate payment');
          return;
        }
        if (cap.success === false && cap.message && cap.message.toLowerCase().includes('not configured')) {
          toast('Payment gateway not configured; please try enrolling from course page');
          return;
        }
        if (cap.success && cap.order) {
          await openRazorpayCheckout(cap.order, profileUser || {}, token, courseIds, navigate, dispatch, async (verifyData) => {
            try {
              dispatch(resetCart());
              toast.success('Payment completed and verified');
              navigate('/dashboard/enrolled-courses');
            } catch (err) {
              console.error('post-payment handler error', err);
            }
          });
        } else {
          toast.error(cap.message || 'Could not create order');
          console.error('capturePayment response', cap);
        }
      } catch (err) {
        console.error('Checkout error', err);
        toast.error('Checkout error');
      }
    }
  return(
     <div>
      
       <p className="text-sm text-gray-400">Total:</p>
       <p className="text-2xl font-bold">Rs {total}</p>

       <IconButton
         text="Buy Now"
         onClick={handleBuyCourse}
         customClasses={"w-full justify-center mt-4 bg-yellow-400 text-black rounded-full px-4 py-2"}
       />

     </div>                                             
  )
}

export default RenderTotalAmount