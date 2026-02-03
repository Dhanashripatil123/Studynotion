import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

// API helpers
import { createSubSection, updateSubSection, fetchFullCourseDetailsById } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { setCourseSectionData, setEntireCourseData } from '../../../../../slices/viewCoursesSlice';

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course || {});
  const { token } = useSelector((state) => state.auth || {});

  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if ((view || edit) && modalData) {
      setValue('lectureTitle', modalData.title || '');
      setValue('lectureDesc', modalData.description || '');
      setValue('lectureVideo', modalData.videoUrl || modalData.video || '');
    }
  }, [view, edit, modalData, setValue]);

  const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true); else setDragActive(false); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer?.files?.[0]) { const file = e.dataTransfer.files[0]; if (file.type.startsWith('video/')) setVideoFile(file); else toast.error('Please upload a video file'); } };
  const handleFileChange = (e) => { const file = e.target?.files?.[0]; if (!file) return; if (!file.type.startsWith('video/')) { toast.error('Please select a valid video file'); e.target.value = ''; return; } setVideoFile(file); };
  const removeVideoFile = () => setVideoFile(null);

  const resolveSectionId = (input) => {
    if (!input) return null;
    if (typeof input === 'string') return input;
    if (typeof input === 'object') return input._id || input.sectionId || null;
    return null;
  };

  const refreshCourseInStore = async () => {
    try {
      const courseId = course?._id || null;
      if (!courseId) return;
      const full = await fetchFullCourseDetailsById(courseId, token);
      const courseData = full?.data || full || null;
      if (courseData) {
        const sectionData = courseData.courseContent || courseData.courseSectionData || courseData.sections || [];
        dispatch(setCourse(courseData));
        dispatch(setCourseSectionData(sectionData));
        dispatch(setEntireCourseData(courseData));
      }
    } catch (err) {
      console.error('Failed to refresh course:', err);
    }
  };

  const updateCourseLocally = (updatedSection) => {
    try {
      const courseId = course?._id || null;
      if (!courseId || !updatedSection) return;

      // Find the section in the current course content and update it
      const currentSections = course?.courseContent || [];
      const updatedSections = currentSections.map(section =>
        section._id === updatedSection._id ? updatedSection : section
      );

      // Update Redux store with the modified sections
      dispatch(setCourse({ ...course, courseContent: updatedSections }));
      dispatch(setCourseSectionData(updatedSections));
      dispatch(setEntireCourseData({ ...course, courseContent: updatedSections }));
    } catch (err) {
      console.error('Failed to update course locally:', err);
      // Fallback to full refresh if local update fails
      refreshCourseInStore();
    }
  };

  const handleEditSubSection = async () => {
    const values = getValues();
    if (!modalData?._id) { toast.error('Invalid subsection'); return; }
    const formData = new FormData();
    formData.append('subSectionId', modalData._id);
    const sid = resolveSectionId(modalData.sectionId || modalData.section);
    if (sid) formData.append('sectionId', sid);
    if (values.lectureTitle && values.lectureTitle !== modalData.title) formData.append('title', values.lectureTitle);
    if (values.lectureDesc && values.lectureDesc !== modalData.description) formData.append('description', values.lectureDesc);
    if (videoFile) formData.append('video', videoFile);

    setLoading(true);
    try {
      const resp = await updateSubSection(formData, token);
      await refreshCourseInStore();
      toast.success('Subsection updated successfully');
      setModalData(null);
    } catch (err) {
      console.error('updateSubSection error', err);
      const serverMsg = err?.response?.data?.message || err?.message || 'Failed to update subsection';
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formValues) => {
    if (view) return;
    if (edit) { await handleEditSubSection(); return; }

    const title = (formValues.lectureTitle || '').trim();
    const description = (formValues.lectureDesc || '').trim();
    const hasVideoFile = !!videoFile;
    const hasVideoUrl = !!(formValues.lectureVideo && formValues.lectureVideo.length);

    if (!title) { toast.error('Lecture title required'); return; }
    if (!description) { toast.error('Lecture description required'); return; }
    if (!hasVideoFile && !hasVideoUrl) { toast.error('Please upload video'); return; }

    const sectionId = resolveSectionId(modalData);
    if (!sectionId) { toast.error('No section selected to add lecture to'); return; }

    const fd = new FormData();
    fd.append('sectionId', sectionId);
    fd.append('title', title);
    fd.append('description', description);
    if (hasVideoFile) fd.append('video', videoFile);
    else fd.append('video', formValues.lectureVideo);

    if (!token) { toast.error('You must be logged in to add a lecture'); return; }

    setLoading(true);
    try {
      console.log('SubSectionModal: Starting createSubSection call');
      const resp = await createSubSection(fd, token);
      console.log('SubSectionModal: createSubSection response:', resp);

      // Use local update instead of full refresh for better performance
      if (resp?.data) {
        console.log('SubSectionModal: Using local update with data:', resp.data);
        updateCourseLocally(resp.data);
      } else {
        console.log('SubSectionModal: No data in response, falling back to full refresh');
        // Fallback to full refresh if response doesn't contain section data
        await refreshCourseInStore();
      }
      toast.success(resp?.message || 'Lecture added successfully');
      console.log('SubSectionModal: Lecture added successfully, closing modal');
      setModalData(null);
    } catch (err) {
      console.error('SubSectionModal: createSubSection error', err);
      const serverMsg = err?.response?.data?.message || err?.message || 'Failed to create subsection';
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-75 overflow-auto">
      <div className="bg-gray-800 rounded-lg p-8 w-[90%] max-w-2xl border border-gray-700 shadow-lg my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">{add ? 'Add Lecture' : edit ? 'Edit Lecture' : 'View Lecture'}</h2>
          <button onClick={() => setModalData(null)} className="text-gray-400 hover:text-white transition-colors"><MdClose size={28} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="lectureTitle" className="text-lg font-semibold text-white mb-2 block">Lecture Title <sup className="text-red-500">*</sup></label>
            <input id="lectureTitle" type="text" placeholder="Enter lecture title" {...register('lectureTitle', { required: true })} disabled={view} className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed" />
            {errors?.lectureTitle && <p className="text-red-500 text-sm font-medium mt-1">Lecture title is required</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="lectureDesc" className="text-lg font-semibold text-white mb-2 block">Lecture Description <sup className="text-red-500">*</sup></label>
            <textarea id="lectureDesc" placeholder="Enter lecture description" {...register('lectureDesc', { required: true })} disabled={view} rows="4" className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed resize-none" />
            {errors?.lectureDesc && <p className="text-red-500 text-sm font-medium mt-1">Lecture description is required</p>}
          </div>

          {!view && (
            <div className="mb-8">
              <label htmlFor="lectureVideo" className="text-lg font-semibold text-white mb-3 block">Lecture Video <sup className="text-red-500">*</sup></label>
              <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-yellow-500 bg-yellow-500 bg-opacity-10' : 'border-gray-400 bg-gray-700 bg-opacity-50'}`}>
                <FiUploadCloud className="mx-auto mb-3 text-yellow-400" size={40} />
                <p className="text-white font-semibold mb-2">Drag and drop your video here</p>
                <p className="text-gray-300 text-sm mb-4">or</p>
                <label className="cursor-pointer inline-block">
                  <input id="lectureVideo" type="file" accept="video/*" onChange={handleFileChange} disabled={view} className="hidden" />
                  <span className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg inline-block transition-colors">Choose File</span>
                </label>
                <p className="text-gray-400 text-xs mt-4">Supported formats: MP4, WebM, Ogg (Max 500MB). Or paste a video URL below.</p>
              </div>

              {videoFile && (
                <div className="mt-4 bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <FiUploadCloud className="text-green-400" size={24} />
                    <div className="flex-1">
                      <p className="text-white font-semibold truncate">{videoFile.name}</p>
                      <p className="text-gray-400 text-sm">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button type="button" onClick={removeVideoFile} className="text-red-400 hover:text-red-300 transition-colors p-2"><MdClose size={20} /></button>
                </div>
              )}

              {!videoFile && (
                <div className="mt-4">
                  <label className="text-sm text-white block mb-2">Or paste a video URL</label>
                  <input type="text" {...register('lectureVideo')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg bg-white text-gray-900" />
                </div>
              )}
            </div>
          )}

          {view && (modalData?.videoUrl || modalData?.video) && (
            <div className="mb-8">
              <label className="text-lg font-semibold text-white mb-2 block">Video URL</label>
              <p className="text-gray-300 break-all bg-gray-700 px-4 py-3 rounded-lg">{modalData.videoUrl || modalData.video}</p>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button type="button" onClick={() => setModalData(null)} className="rounded-lg px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors">{view ? 'Close' : 'Cancel'}</button>
            {!view && (
              <button type="submit" disabled={loading} className="rounded-lg px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2">{loading ? 'Saving...' : edit ? 'Update Lecture' : 'Add Lecture'}</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
