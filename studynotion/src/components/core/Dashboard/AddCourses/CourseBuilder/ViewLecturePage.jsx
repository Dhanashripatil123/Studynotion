import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateSubSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5'

const ViewLecturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lectureFromState = location?.state?.lecture || null;
  const token = useSelector((state) => state.auth.token);

  const [lecture, setLecture] = useState(lectureFromState);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(lectureFromState?.title || '');
  const [description, setDescription] = useState(lectureFromState?.description || '');
  const [videoSrc, setVideoSrc] = useState(lectureFromState?.videoUrl || null);

  useEffect(() => {
    // If a File object was passed (local add), create an object URL for preview
    if (lectureFromState && lectureFromState.videoFile && lectureFromState.videoFile instanceof File) {
      const url = URL.createObjectURL(lectureFromState.videoFile);
      setVideoSrc(url);
      return () => URL.revokeObjectURL(url);
    }
    setVideoSrc(lectureFromState?.videoUrl || null);
  }, [lectureFromState]);

  if (!lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">No lecture data provided.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-yellow-500 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const onDelete = async () => {
    const ok = window.confirm('Delete this lecture? This action cannot be undone.');
    if (!ok) return;
    try {
      const data = { subSectionId: lecture._id };
      const res = await deleteSubSection(data, token);
      // success -> navigate back so parent list can refresh
      toast.success('Lecture deleted');
      if (lecture?.sectionId) {
        navigate('/dashboard/add-course', { state: { openSectionId: lecture.sectionId } })
      } else {
        navigate(-1)
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Failed to delete lecture');
    }
  };

  const onSave = async () => {
    if (!title?.trim()) {
      toast.error('Title cannot be empty');
      return;
    }

    try {
      const payload = { subSectionId: lecture._id, title: title.trim(), description };
      const res = await updateSubSection(payload, token);
      toast.success('Lecture updated');
      // update local UI; res may contain updated section data; update minimal fields locally
      setLecture((prev) => ({ ...prev, title: title.trim(), description }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Failed to update lecture');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/dashboard/add-course', { state: lecture?.sectionId ? { openSectionId: lecture.sectionId, highlightLectureId: lecture._id } : {} })} className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-500 text-black hover:bg-yellow-600">
          <IoArrowBack />
          <span className='font-semibold'>Back</span>
        </button>

        <div className="text-right">
          <h2 className="text-xl font-bold text-white">View Your Lecture</h2>
          <p className="text-sm text-gray-400">Review the lecture and manage video, title and description</p>
        </div>
      </div>

      {!isEditing ? (
        <>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:items-start md:gap-6">
              <div className="flex-1 bg-gray-800 p-6 rounded-md border border-gray-700">
                <div className='max-w-3xl'>
                  <label className='block text-sm text-gray-400 mb-1 font-medium'>Title</label>
                  <h1 className="text-3xl font-semibold text-white mb-3 truncate">{lecture.title || 'Untitled Lecture'}</h1>
                  <label className='block text-sm text-gray-400 mb-1 font-medium'>Description</label>
                  <div className='bg-gray-900 p-4 rounded-md border border-gray-700'>
                    <p className="text-gray-300 whitespace-pre-wrap">{lecture.description || "No description provided."}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:w-40 flex-shrink-0 flex flex-col items-stretch gap-3">
                <button onClick={() => setIsEditing(true)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">Edit</button>
                <button onClick={onDelete} className="w-full px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3 mb-4 bg-gray-800 p-5 rounded-md border border-gray-700">
          <label className='block text-sm text-gray-300 font-medium mb-1'>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          <label className='block text-sm text-gray-300 font-medium mt-2 mb-1'>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" rows={6} />
          <div className="flex gap-2 justify-end">
            <button onClick={onSave} className="px-4 py-2 bg-yellow-500 text-black rounded-md">Save</button>
            <button onClick={() => { setIsEditing(false); setTitle(lecture.title); setDescription(lecture.description); }} className="px-4 py-2 bg-gray-700 text-white rounded-md">Cancel</button>
          </div>
        </div>
      )}

      {videoSrc ? (
        <div className="w-full max-w-4xl">
          <video controls src={videoSrc} className="w-full rounded bg-black">
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p className="text-red-400">No video available for this lecture.</p>
      )}
    </div>
  );
};

export default ViewLecturePage;
