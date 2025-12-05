import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast'; // added toast for error display
// import { createSubSection, setCourse } from 'your-api-file'; // <-- import your actual functions

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue('lectureTitle', modalData.title);
      setValue('lectureDesc', modalData.description);
      setValue('lectureVideo', modalData.videoUrl);
    }
  }, [view, edit, modalData, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  const handleEditSubSection = () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append('sectionId', modalData.sectionId);
    formData.append('subSectionId', modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append('title', currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append('description', currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append('video', currentValues.lectureVideo);
    }

    setLoading(true);
    // API call here
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error('No changes made to the form');
      } else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append('sectionId', modalData.sectionId);
    formData.append('title', data.lectureTitle);
    formData.append('description', data.lectureDesc);
    formData.append('video', data.lectureVideo);

    setLoading(true);
    // API CALL
    // const result = await createSubSection(formData, token);

    // if (result) {
    //   dispatch(setCourse(result));
    // }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('lectureTitle')} placeholder="Lecture Title" />
        <input {...register('lectureDesc')} placeholder="Lecture Description" />
        <input {...register('lectureVideo')} placeholder="Lecture Video URL" />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default SubSectionModal;
