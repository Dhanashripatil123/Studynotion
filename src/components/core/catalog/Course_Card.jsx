import RatingStars from "../../common/RatingStars";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { deleteCourse } from '../../../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';

const Course_Card = ({ course, Height = "h-[220px]", onDelete, showDelete = false }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  const instructorFirst = course?.instructor?.firstName ?? "";
  const instructorLast = course?.instructor?.lastName ?? "";
  const ratingArrayLength =
    course?.ratingAndReview?.length ??
    course?.RatingAndReview?.length ??
    0;

  const enrolledCount =
    (Array.isArray(course?.studentEnrolled) && course.studentEnrolled.length) ||
    (Array.isArray(course?.studentsEnrolled) && course.studentsEnrolled.length) ||
    course?.totalStudentsEnrolled ||
    course?.enrolledCount ||
    0;

  const imgSrc = course?.thumbnail || "";
  const id = course?._id || course?.courseId;

  return (
    <div className="p-3 sm:p-4">
      <Link
        to={`/course/${id}`}
        className="block bg-[#0b1724] rounded-lg overflow-hidden shadow-md hover:shadow-xl transform-gpu hover:-translate-y-1 transition duration-200 ease-out h-full"
      >
        <div className={`w-full overflow-hidden ${Height} relative`}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={course?.courseName}
              className="w-full h-full object-cover block"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2.5 py-1 rounded-md font-semibold">
            ₹{course?.price || "0"}
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight line-clamp-2">
            {course?.courseName}
          </h3>

          <div className="text-sm text-gray-400 mt-2">
            {(instructorFirst + " " + instructorLast).trim() || "Unknown"}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-sm text-gray-300">{ratingArrayLength}</span>
              {showDelete && (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const courseId = course?._id || course?.courseId || course?.id;
                    if (!courseId) return toast.error('Course id missing');
                    const confirm = window.confirm('Delete this course? This action cannot be undone.');
                    if (!confirm) return;
                    // If parent provided onDelete handler, call it
                    if (typeof onDelete === 'function') {
                      try { await onDelete(courseId); } catch (err) { console.error(err); }
                      return;
                    }
                    // Otherwise attempt API delete (requires auth)
                    const token = (typeof window !== 'undefined') ? (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null) : null;
                    if (!token) return toast.error('Not authorized to delete');
                    try {
                      const resp = await deleteCourse(courseId, token);
                      if (resp?.success) {
                        toast.success(resp?.message || 'Course deleted');
                        // refresh page to reflect deletion
                        window.location.reload();
                      } else {
                        toast.error(resp?.message || 'Failed to delete course');
                      }
                    } catch (err) {
                      console.error('Delete course error', err);
                      toast.error('Failed to delete course');
                    }
                  }}
                  className="text-red-400 hover:text-red-500 ml-1"
                  title="Delete course"
                >
                  <AiOutlineDelete />
                </button>
              )}
            </div>

            <div className="text-sm text-gray-300 font-medium flex flex-col items-end">
              <span className="text-xs text-gray-400">{course?.level || ""}</span>
              <span className="text-sm text-yellow-400 font-semibold">{enrolledCount} students</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
