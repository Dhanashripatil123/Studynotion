import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-stars'
import IconButton from '../../common/IconButton';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import Avatar from '../../common/Avatar';

function CourseReviewModal({ setReviewModal }) {

  const { user } = useSelector((state) => state.auth || {});
  const { token } = useSelector((state) => state.auth || {});
  // Read courseEntireData defensively — reducer key may be `ViewCourse` or `viewCourse`
  const courseEntireData = useSelector((state) => (state.ViewCourse?.courseEntireData || state.viewCourse?.courseEntireData || {}));
  const courseId = courseEntireData?._id || courseEntireData?.courseId;

  const sectionData = courseEntireData?.courseSectionData || courseEntireData?.courseContent || courseEntireData?.sections || [];
  const totalLectures = Array.isArray(sectionData) ? sectionData.reduce((acc, s) => acc + ((s.subSection || s.lectures || []).length), 0) : 0;
  const completed = courseEntireData?.completedLectures || courseEntireData?.completedvideos || courseEntireData?.completedVideos || [];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue])

  const onSumbit = async (data) => {
    try {
      await createRating({
        rating: data.courseRating,
        course: courseId,
        review: data.courseExperience,
      }, token);
      // close modal on success
      setReviewModal(false);
    } catch (err) {
      console.error('Failed to submit rating', err);
    }
  }

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => setReviewModal(false)} />
      <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white w-[90%] max-w-4xl rounded-lg shadow-xl overflow-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left: course info summary */}
          <div className="md:w-1/3 p-6 bg-gray-100 dark:bg-gray-800">
            <img src={courseEntireData?.thumbnail || courseEntireData?.courseThumbnailUrl || 'https://via.placeholder.com/320x180'} alt={courseEntireData?.courseName} className="w-full h-36 object-cover rounded" />
            <h3 className="mt-4 text-lg font-semibold">{courseEntireData?.courseName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Instructor: {(courseEntireData?.instructor && (courseEntireData.instructor.firstName || courseEntireData.instructor.email)) || '—'}</p>
            <p className="text-sm text-yellow-500 mt-2">{(completed?.length || 0)}/{totalLectures || 0} Lectures completed</p>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Sections</h4>
              <div className="space-y-2 text-sm">
                {sectionData.length === 0 ? (
                  <div className="text-gray-500">No sections</div>
                ) : (
                  sectionData.map((s) => (
                    <div key={s._id} className="flex justify-between items-center">
                      <div className="truncate pr-2">{s.sectionName}</div>
                      <div className="text-gray-500 text-xs">{(s.subSection || s.lectures || []).length}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right: review form */}
          <div className="md:flex-1 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Add Review</h2>
                <button onClick={() => setReviewModal(false)} className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md font-semibold shadow">
                  Close
                </button>
              </div>

            <div className="mt-4 flex items-center gap-4">
              <Avatar size="lg" />
              <div>
                <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-500">Posting publicly</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSumbit)} className='mt-6'>
              <div>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={28}
                  color2={'#ffd700'} />
              </div>

              <div className="mt-4">
                <label htmlFor='courseExperience' className='block text-sm font-medium mb-2'>Your review</label>
                <textarea
                  id='courseExperience'
                  placeholder='Share your experience'
                  {...register("courseExperience", { required: true })}
                  className='form-style min-h-[140px] w-full p-3 rounded border'
                />
                {errors.courseExperience && (
                  <span className='text-red-500'>Please share your experience</span>
                )}
              </div>

              <div className='flex gap-2 mt-6'>
                <button type='button' onClick={() => setReviewModal(false)} className='px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-50 rounded-md font-medium'>Cancel</button>
                <IconButton text='Save' onClick={handleSubmit(onSumbit)} customClasses="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
