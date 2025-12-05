import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FooterLinks2 from "../components/FooterLink2";
import { toast } from 'react-hot-toast';
import { fetchCourseDetails, fetchFullCourseDetailsAuthenticated } from "../services/operations/courseDetailsAPI";
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

  // profileUser and token are already read above
 

  useEffect(() => {
    const load = async () => {
      if (!courseId) return;
      setLoading(true);
      let res = null;
      try {
        if (token) {
          // fetch extra gated fields for authenticated users
          res = await fetchFullCourseDetailsAuthenticated(courseId, token);
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

  

  if (loading) {
    return <div className="p-6 text-white">Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="p-6 text-white">
        <div>Course not found.</div>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 rounded">Go back</button>
      </div>
    );
  }

  const totalSections = Array.isArray(course.courseContent) ? course.courseContent.length : 0;
  const totalLectures = Array.isArray(course.courseContent) ? course.courseContent.reduce((sum, s) => sum + (Array.isArray(s.subSection) ? s.subSection.length : 0), 0) : 0;

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
          const refreshed = await fetchFullCourseDetailsAuthenticated(course._id || courseId, token);
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
            const refreshed = await fetchFullCourseDetailsAuthenticated(course._id || courseId, token);
            if (refreshed && refreshed.success && refreshed.data) setCourse(refreshed.data);
          } else {
            toast.error(res?.message || 'Enrollment failed');
          }
        } else if (cap.success && cap.order) {
          // Open Razorpay checkout — pass a success callback to refresh course details after verification
          const checkoutResult = await openRazorpayCheckout(cap.order, profileUser || {}, token, [course._id || courseId], navigate, dispatch, async (verifyData) => {
            try {
              // refresh authenticated course details
              const refreshed = await fetchFullCourseDetailsAuthenticated(course._id || courseId, token);
              if (refreshed && refreshed.success && refreshed.data) {
                setCourse(refreshed.data);
                toast.success('Enrollment completed');
              }
            } catch (err) {
              console.error('refresh after payment error', err);
            }
          });
          if (!checkoutResult || checkoutResult.success === false) {
            toast.error(checkoutResult?.message || 'Checkout initialization failed');
          }
        
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

  return (
    <div className="p-6 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#071226] rounded-lg p-6 shadow">
        <div className="flex gap-6">
          <div className="w-1/3">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.courseName} className="w-full h-auto rounded" />
            ) : (
              <div className="w-full h-48 bg-gray-800 flex items-center justify-center">No image</div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{course.courseName}</h1>
            <p className="text-sm text-gray-300 mt-2">{course.courseDescription}</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="text-lg font-semibold">₹{course.price}</div>
              <div className="text-sm text-gray-400">Instructor: {course.instructor?.firstName || ''} {course.instructor?.lastName || ''}</div>
              <div className="text-sm text-gray-400">Category: {course.category?.name || course.category}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold">What you'll learn</h3>
                <p className="text-gray-300 mt-2">{course.whatYouWillLearn}</p>
              </div>
              <div>
                <h3 className="font-semibold">Course Summary</h3>
                <div className="text-gray-300 mt-2">
                  <div className="flex items-center gap-2"><span className="font-bold">Sections:</span> <span>{totalSections}</span></div>
                  <div className="flex items-center gap-2"><span className="font-bold">Lectures:</span> <span>{totalLectures}</span></div>
                  <div className="flex items-center gap-2"><span className="font-bold">Students:</span> <span>{(course.studentEnrolled || []).length}</span></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Details</h3>
                <div className="text-gray-300 mt-2">
                  <div>Rating: {course.ratingAndReview?.length ? (course.ratingAndReview.reduce((s,r)=>s+(r.rating||0),0)/course.ratingAndReview.length).toFixed(2) : 'N/A'}</div>
                  {course.tag && <div>Tag: {course.tag?.name || course.tag}</div>}
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* Single immediate enroll flow (no payment/add-to-cart) for non-instructor users */}
              {(!profileUser || profileUser?.accountType !== 'Instructor') && (
                <div className="flex gap-3 mt-4">
                  <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-700 rounded text-white">Back</button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Course Content / Sections */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Course Content</h2>
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

      </div>
        <aside className="bg-[#071226] rounded-lg p-6 shadow">
          <div className="text-center">
            <div className="text-3xl font-bold">₹{course.price}</div>
            <div className="text-sm text-gray-300 mt-1">{(course.studentEnrolled || []).length} students enrolled</div>
          </div>

          <div className="mt-6">
            <button disabled={isEnrolled() || enrolling} onClick={handleEnrollNow} className={`w-full px-4 py-3 rounded text-white ${isEnrolled() ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}>
              {isEnrolled() ? 'Already Enrolled' : enrolling ? 'Processing...' : 'Enroll Now'}
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <div><strong>Instructor:</strong> {course.instructor?.firstName} {course.instructor?.lastName}</div>
            <div className="mt-2"><strong>Category:</strong> {course.category?.name || course.category}</div>
            <div className="mt-2"><strong>Rating:</strong> {course.ratingAndReview?.length ? (course.ratingAndReview.reduce((s,r)=>s+(r.rating||0),0)/course.ratingAndReview.length).toFixed(2) : 'N/A'}</div>
          </div>
        </aside>
      </div>
        

        <div className="mt-8">
          <FooterLinks2 />
        </div>
    </div>
  );
};

export default CourseDetails;
