import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterLinks2 from "../components/FooterLink2";
import { toast } from 'react-hot-toast';
import { fetchCourseDetails, getFullDetailsofCourse } from "../services/operations/courseDetailsAPI";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { enrollCourse } from "../services/operations/courseDetailsAPI";

import { byCourse, capturePayment, openRazorpayCheckout } from "../services/operations/paymentAPI";

const CourseDetails = () => {
  // get profile user and auth token from redux
  const profileUser = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
   const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState(new Set());
  const [enrolling, setEnrolling] = useState(false);
  const [paymentDebug, setPaymentDebug] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  // profileUser and token are already read above
   

  useEffect(() => {
    const load = async () => {
      if (!courseId) return;
      setLoading(true);
      let res = null;
      try {
        if (token) {
          // fetch extra gated fields for authenticated users
          res = await getFullDetailsofCourse(courseId, token);
        } else {
          res = await fetchCourseDetails(courseId);
        }
      } catch (err) {
        console.error('Error fetching course details', err);
      }

      if (res && res.success && res.data) {
        setCourse(res.data);
      } else {
        console.error('Failed to load course details', res);
      }

      setLoading(false);
    };
    load();
  }, [courseId, token]);

  // listen for payment debug events emitted by paymentAPI
  useEffect(() => {
    const handler = (e) => {
      setPaymentDebug(e?.detail || window.STN_PAYMENT_DEBUG || null);
      setShowDebug(true);
    };
    window.addEventListener('stn-payment-debug', handler);
    // also initialize from any existing global
    if (window.STN_PAYMENT_DEBUG) setPaymentDebug(window.STN_PAYMENT_DEBUG);
    return () => window.removeEventListener('stn-payment-debug', handler);
  }, []);

  if (loading) {
    return <div className="p-6 font-sans text-gray-200">Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="p-6 font-sans text-gray-200">
        <div>Course not found.</div>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg">Go back</button>
      </div>
    );
  }

  const totalSections = Array.isArray(course.courseContent) ? course.courseContent.length : 0;
  const totalLectures = Array.isArray(course.courseContent) ? course.courseContent.reduce((sum, s) => sum + (Array.isArray(s.subSection) ? s.subSection.length : 0), 0) : 0;

  const computeAverageRating = (c) => {
    if (!c) return null;
    // Common server shapes
    const candidates = [c.ratingAndReview, c.RatingAndReview, c.reviews, c.ratings, c.rating, c.ratingsAndReview];
    for (const arr of candidates) {
      if (Array.isArray(arr) && arr.length) {
        const sum = arr.reduce((s, r) => s + (r?.rating || r?.value || 0), 0);
        return (sum / arr.length).toFixed(2);
      }
    }
    // fallback: maybe server provides an avg value
    if (typeof c.avgRating === 'number') return c.avgRating.toFixed(2);
    if (c.averageRating) return Number(c.averageRating).toFixed ? Number(c.averageRating).toFixed(2) : String(c.averageRating);
    return null;
  };

  const isEnrolled = () => {
    try {
      if (!course.studentEnrolled) return false;
      const arr = course.studentEnrolled || [];
      const uid = profileUser?._id || profileUser?.id;
      return arr.some(a => String(a) === String(uid));
    } catch (err) {
      return false;
     
    }
  }

  const learnItems = (() => {
    const w = course?.whatYouWillLearn;
    if (!w) return [];
    if (Array.isArray(w)) return w.map(i => String(i).trim()).filter(Boolean);
    if (typeof w === 'string') {
      if (w.includes('\n')) return w.split('\n').map(s => s.trim()).filter(Boolean);
      if (w.includes(',')) return w.split(',').map(s => s.trim()).filter(Boolean);
      return w.split(/[;•·●]|\.\s/).map(s => s.trim()).filter(Boolean);
    }
    return [String(w)];
  })();

  const avgRating = computeAverageRating(course);
  const reviewCount = (() => {
    const candidates = [course.ratingAndReview, course.RatingAndReview, course.reviews, course.ratings, course.rating, course.ratingsAndReview];
    for (const arr of candidates) {
      if (Array.isArray(arr)) return arr.length;
    }
    return 0;
  })();

  const formattedCreated = course.createdAt ? new Date(course.createdAt).toLocaleDateString() : null;
  const language = course.language || 'English';

  const toggleSection = (sectionId) => {
    const copy = new Set(openSections);
    if (copy.has(sectionId)) copy.delete(sectionId);
    else copy.add(sectionId);
    setOpenSections(copy);
  }

  const handleEnrollNow = async () => {
    // If not authenticated, use byCourse helper which will redirect to login
    if (!token) {
      try {
        byCourse(token, [courseId], navigate, dispatch, profileUser);
      } catch (err) {
        console.error('byCourse error', err);
      }
      return;
    }
    // Authenticated: if course is free (price 0) use enrollCourse, otherwise start payment flow
    setEnrolling(true);
    try {
      const coursePrice = Number(course.price || 0);
      if (!coursePrice) {
        const res = await enrollCourse(course._id || courseId, token);
        if (res && res.success) {
          toast.success(res.message || 'Enrolled successfully');
          const refreshed = await  getFullDetailsofCourse(course._id || courseId, token);
          if (refreshed && refreshed.success && refreshed.data) setCourse(refreshed.data);
        } else {
          toast.error(res?.message || 'Enrollment failed');
        }
      } else {
        // Paid course: request server to create order
        const cap = await capturePayment([course._id || courseId], token);
        if (!cap) {
          toast.error('Failed to initiate payment');
        } else if (cap.success === false && cap.message && cap.message.toLowerCase().includes('not configured')) {
          // Payment gateway disabled on server — fallback to direct enroll
          toast('Payment gateway not configured; enrolling directly');
          const res = await enrollCourse(course._id || courseId, token);
          if (res && res.success) {
            toast.success(res.message || 'Enrolled successfully');
            const refreshed = await getFullDetailsofCourse(course._id || courseId, token);
            if (refreshed && refreshed.success && refreshed.data) setCourse(refreshed.data);
          } else {
            toast.error(res?.message || 'Enrollment failed');
          }
        } else if (cap.success && cap.order) {
          // Open Razorpay checkout — pass a success callback to refresh course details after verification
          await openRazorpayCheckout(cap.order, profileUser || {}, token, [course._id || courseId], navigate, dispatch, async (verifyData) => {
            try {
              // refresh authenticated course details
              const refreshed = await getFullDetailsofCourse(course._id || courseId, token);
              if (refreshed && refreshed.success && refreshed.data) {
                setCourse(refreshed.data);
                toast.success('Enrollment completed');
              }
            } catch (err) {
              console.error('refresh after payment error', err);
            }
          });
        } else {
          toast.error(cap.message || 'Could not create order');
          console.error('capturePayment response', cap);
        }
      }
    } catch (err) {
      console.error('Enrollment/payment error', err);
      toast.error('Enrollment/payment error');
    } finally {
      setEnrolling(false);
    }
  }

  const handleAddToCart = () => {
    try {
      dispatch(addToCart(course));
      toast.success('Course added to cart');
      navigate('/dashboard/cart');
    } catch (err) {
      console.error('Add to cart error', err);
      toast.error('Could not add to cart');
    }
  }

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#020617] via-[#071226] to-[#0b1630] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-3 py-2 bg-yellow-500 rounded-lg text-black font-semibold shadow">
              ← Back
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{course.courseName}</h1>
              <div className="text-sm text-gray-400 mt-1">Instructor: {course.instructor?.firstName || ''} {course.instructor?.lastName || ''}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
        <div className="bg-[#071226] rounded-xl p-6 shadow-lg shadow-black/50">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mt-0 text-sm text-gray-300 bg-gradient-to-br from-[#071226] to-transparent p-3 rounded-md border border-gray-800">
              <h4 className="font-semibold text-white">Details</h4>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.05 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" /></svg>
                  <span className="font-semibold">{(avgRating ?? '0.00')}</span>
                </div>
                <div className="text-sm text-gray-400">{reviewCount} review{reviewCount !== 1 ? 's' : ''}</div>
              </div>
              <div className="mt-2"><strong>Tag:</strong> {course.tag?.name || course.tag || '—'}</div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{course.courseName}</h1>
            <p className="text-sm text-gray-300 mt-2">{course.courseDescription}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="text-lg font-semibold">₹{course.price}</div>
              <div className="text-sm text-gray-400">Instructor: {course.instructor?.firstName || ''} {course.instructor?.lastName || ''}</div>
              <div className="text-sm text-gray-400">Category: {course.category?.name || course.category}</div>
            </div>

            

            {/* removed duplicate Back button (now in header) */}

          </div>
        </div>

        {/* Course Content / Sections */}
        <div className="mt-8">
           <div className="bg-[#071226] border border-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-white">What you'll learn</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {learnItems.length ? (
                  learnItems.map((it, idx) => (
                    <div key={idx} className="px-3 py-2 bg-[#0f2a44] border border-gray-700 rounded text-sm text-gray-200 transition transform hover:-translate-y-0.5">
                      {it}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-300 mt-2">—</p>
                )}
              </div>
            </div>
          <h2 className="text-xl font-bold">Course Content</h2>
          <h3 className="font-semibold">Course Summary</h3>
          <div className="text-gray-300 mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2"><span className="font-bold">Sections:</span> <span>{totalSections}</span></div>
            <div className="flex items-center gap-2"><span className="font-bold">Lectures:</span> <span>{totalLectures}</span></div>
            <div className="flex items-center gap-2"><span className="font-bold">Students:</span> <span>{(course.studentEnrolled || []).length}</span></div>
          </div>
          {Array.isArray(course.courseContent) && course.courseContent.length > 0 ? (
            <div className="mt-4 space-y-3">
              {course.courseContent.map((section) => {
                const lectureCount = Array.isArray(section.subSection) ? section.subSection.length : 0;
                const isOpen = openSections.has(section._id);
                return (
                  <div key={section._id} className="bg-[#0b1a2b] rounded overflow-hidden">
                    <button onClick={() => toggleSection(section._id)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#0f2a44] focus:outline-none">
                      <div>
                        <div className="font-semibold">{section.sectionName}</div>
                        <div className="text-sm text-gray-400">{lectureCount} lecture{lectureCount !== 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-sm text-gray-300">{isOpen ? 'Hide' : 'Show'}</div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        {lectureCount > 0 ? (
                          <ul className="divide-y divide-gray-700">
                            {section.subSection.map((sub) => (
                              <li key={sub._id} className="py-2 flex items-center justify-between text-gray-200">
                                <div>{sub.title || sub.subSectionTitle || 'Untitled lecture'}</div>
                                <div className="text-xs text-gray-400">{sub.timeDuration || ''}</div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-500 py-2">No lectures in this section</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-gray-400 mt-2">No course content available.</div>
          )}
        </div>

        <div className="mt-6">
          
        </div>

      </div>
      </div>
      <aside className="bg-gradient-to-br from-[#071226] to-[#081028] rounded-xl p-6 shadow-xl sticky top-24 h-fit">
          <div className="mb-4 rounded-md overflow-hidden shadow-sm">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.courseName} className="w-full h-44 object-cover" />
            ) : (
              <div className="w-full h-44 bg-gray-800 flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>

          <div className="text-center mb-4">
            <div className="text-4xl font-extrabold text-yellow-400">₹{course.price || '0'}</div>
            <div className="text-sm text-gray-400 mt-1">{(course.studentEnrolled || []).length} students enrolled</div>
          </div>

          <div className="space-y-3">
            <button
              disabled={isEnrolled() || enrolling}
              onClick={handleEnrollNow}
              className={isEnrolled() || enrolling ? 'w-full px-4 py-3 rounded-full font-semibold transition transform bg-gray-600 text-white' : 'w-full px-4 py-3 rounded-full font-semibold transition transform bg-yellow-400 text-black hover:brightness-95 active:scale-98'}
            >
              {isEnrolled() ? 'Already Enrolled' : enrolling ? 'Processing...' : 'Buy Now'}
            </button>

            <button onClick={handleAddToCart} className="w-full px-4 py-2 rounded-full border border-gray-700 text-gray-200 hover:bg-gray-800 transition">Add to Cart</button>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">30-day money-back guarantee • Secure checkout</div>

          <div className="mt-4 border-t border-gray-800 pt-4 text-sm text-gray-300">
            <div className="flex items-center justify-between"><span className="font-semibold">Includes</span></div>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><span className="text-yellow-400">●</span> Videos: {course.totalVideos || '—'}</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">●</span> Lifetime access</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">●</span> Certificate of completion</li>
            </ul>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <div><strong>Language:</strong> {language}</div>
            {formattedCreated && <div className="mt-1"><strong>Created:</strong> {formattedCreated}</div>}
          </div>
        </aside>
      </div>
        {/* Debug overlay - toggleable */}
        {showDebug && paymentDebug && (
          <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 9999, width: 360 }}>
            <div className="bg-black bg-opacity-80 text-white p-3 rounded shadow-lg text-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Payment Debug</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setShowDebug(false); }} className="px-2 py-1 bg-gray-700 rounded">Hide</button>
                  <button onClick={() => { setPaymentDebug(null); }} className="px-2 py-1 bg-gray-700 rounded">Clear</button>
                </div>
              </div>
              <div style={{ maxHeight: 260, overflow: 'auto', fontFamily: 'monospace', fontSize: 12 }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(paymentDebug, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <FooterLinks2 />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
