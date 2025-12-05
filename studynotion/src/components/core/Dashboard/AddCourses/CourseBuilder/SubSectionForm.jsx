import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiUploadCloud } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const SubSectionForm = ({
  sectionId,
  modalData,
  edit = false,
  onCancel,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const { course } = {};
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  

  useEffect(() => {
    if (edit && modalData) {
      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, [edit, modalData, setValue]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        toast.error('Please upload a video file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        toast.error('Please select a valid video file');
        e.target.value = '';
      }
    }
  };

  const removeVideoFile = () => {
    setVideoFile(null);
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    // For local editing (no backend): update via onSuccess callback
    const currentValues = getValues();
    setLoading(true);
    try {
      const updatedLecture = {
        _id: modalData._id,
        title: currentValues.lectureTitle,
        description: currentValues.lectureDesc,
        videoUrl: videoFile ? URL.createObjectURL(videoFile) : currentValues.lectureVideo || modalData.videoUrl,
      };
      toast.success('Lecture updated (local)');
      onSuccess && onSuccess(updatedLecture);
    } catch (err) {
      toast.error('Failed to update lecture');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (edit) {
      if (!isFormUpdated() && !videoFile) {
        toast.error('No changes made to the form');
      } else {
        await handleEditSubSection();
      }
      return;
    }

    if (!videoFile && !data.lectureVideo) {
      toast.error('Please upload a video file');
      return;
    }

    setLoading(true);
    try {
      const newLecture = {
        _id: `l_${Date.now()}`,
        title: data.lectureTitle,
        description: data.lectureDesc,
        videoUrl: videoFile ? URL.createObjectURL(videoFile) : (data.lectureVideo && data.lectureVideo[0] ? data.lectureVideo[0].name : ''),
      };

      // Local only: call parent handler
      toast.success('Lecture added (local)');
      onSuccess && onSuccess(newLecture);
    } catch (error) {
      toast.error('Failed to add lecture');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 mt-4 mb-4 border-2 border-yellow-400 border-dashed">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          {edit ? "Edit Lecture" : "Add New Lecture"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <MdClose size={28} />
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)() }} className="space-y-6">
        {/* Lecture Title */}
        <div>
          <label htmlFor="lectureTitle" className="text-lg font-semibold text-white mb-2 block">
            Lecture Title <sup className="text-red-500">*</sup>
          </label>
          <input
            id="lectureTitle"
            type="text"
            placeholder="Enter lecture title"
            {...register('lectureTitle', { required: 'Lecture title is required' })}
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors?.lectureTitle && (
            <p className="text-red-500 text-sm font-medium mt-1">{errors.lectureTitle?.message}</p>
          )}
        </div>

        {/* Lecture Description */}
        <div>
          <label htmlFor="lectureDesc" className="text-lg font-semibold text-white mb-2 block">
            Lecture Description <sup className="text-red-500">*</sup>
          </label>
          <textarea
            id="lectureDesc"
            placeholder="Enter lecture description"
            {...register('lectureDesc', { required: 'Lecture description is required' })}
            rows="4"
            className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />
          {errors?.lectureDesc && (
            <p className="text-red-500 text-sm font-medium mt-1">{errors.lectureDesc?.message}</p>
          )}
        </div>

        {/* Lecture Video Upload */}
        <div>
          <label htmlFor="lectureVideo" className="text-lg font-semibold text-white mb-3 block">
            Lecture Video <sup className="text-red-500">*</sup>
          </label>

          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                : 'border-gray-400 bg-gray-600 bg-opacity-50'
            }`}
          >
            <FiUploadCloud className="mx-auto mb-3 text-yellow-400" size={40} />
            <p className="text-white font-semibold mb-2">Drag and drop your video here</p>
            <p className="text-gray-300 text-sm mb-4">or</p>

            <label className="cursor-pointer inline-block">
              <input
                id="lectureVideo"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg inline-block transition-colors">
                Choose File
              </span>
            </label>

            <p className="text-gray-400 text-xs mt-4">
              Supported formats: MP4, WebM, Ogg (Max 500MB)
            </p>
          </div>

          {/* File Preview */}
          {videoFile && (
            <div className="mt-4 bg-gray-600 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <FiUploadCloud className="text-green-400" size={24} />
                <div className="flex-1">
                  <p className="text-white font-semibold truncate">{videoFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeVideoFile}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
              >
                <MdClose size={20} />
              </button>
            </div>
          )}

          {errors?.lectureVideo && (
            <p className="text-red-500 text-sm font-medium mt-2">{errors.lectureVideo?.message}</p>
          )}
          {edit && <p className="text-gray-400 text-sm mt-2">Leave empty to keep current video</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-600">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); handleSubmit(onSubmit)() }}
            disabled={loading}
            className="rounded-lg px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? "Saving..." : edit ? "Update Lecture" : "Add Lecture"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubSectionForm;
