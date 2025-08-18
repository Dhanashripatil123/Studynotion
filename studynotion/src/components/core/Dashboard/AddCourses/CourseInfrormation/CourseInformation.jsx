import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconButton";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { toast } from "react-toastify";
import { fetchCourseCategories, editCourseDetails, addCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";

const CourseInformation = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories?.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        };

        if (editCourse && course) {
            setValue("courseTitle", course.courseName || "");
            setValue("courseShortDesc", course.courseDescription || "");
            setValue("coursePrice", course.price || "");
            // setValue("courseTags", course.tag || []);
            setValue("courseBenefits", course.whatYouWillLearn || "");
            setValue("courseCategory", course.category || "");
            setValue("courseRequirements", course.instruction || []);
            // setValue("courseImages", course.thumbnail || "");
        }

        getCategories();
    }, [editCourse, course, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory?._id !== course.category?._id ||
            currentValues.courseRequirements?.toString() !== course.instruction?.toString()
        );
    };

    const onSubmit = async (data) => {
        if (editCourse) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form");
                return;
            }

            const formData = new FormData();
            formData.append("courseId", course._id);

            if (data.courseTitle !== course.courseName)
                formData.append("courseName", data.courseTitle);
            if (data.courseShortDesc !== course.courseDescription)
                formData.append("courseDescription", data.courseShortDesc);
            if (data.coursePrice !== course.price)
                formData.append("price", data.coursePrice);
            if (data.courseBenefits !== course.whatYouWillLearn)
                formData.append("whatYouWillLearn", data.courseBenefits);
            if (data.courseCategory?._id !== course.category?._id)
                formData.append("category", data.courseCategory);
            if (
                data.courseRequirements?.toString() !== course.instruction?.toString()
            )
                formData.append("instructions", JSON.stringify(data.courseRequirements));

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);

            if (result) {
                dispatch(setCourse(result));
                dispatch(setStep(2));
            }
        } else {
            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("status", COURSE_STATUS.DRAFT);

            setLoading(true);
            console.log('BEFORE ADD COURSES API CALL');
            console.log('PRINTING FORMDATA',formData);
            const result = await addCourseDetails(formData, token);
             if (result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
              }
              setLoading(false);
              console.log("PRINTING FORMDATA",formData);
              console.log("PRINTING result",formData);
              
              
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-md border-gray-800 p-6 space-y-8"
            >
                {/* Course Title */}
                <div>
                    <label>
                        Course Title<sup>*</sup>
                    </label>
                    <input
                        id="courseTitle"
                        placeholder="Enter course title"
                        {...register("courseTitle", { required: true })}
                        className="w-full"
                    />
                    {errors.courseTitle && <span>Course Title is required</span>}
                </div>

                {/* Short Description */}
                <div>
                    <label>Course Short Description<sup>*</sup></label>
                    <textarea
                        id="courseShortDesc"
                        placeholder="Enter description"
                        {...register("courseShortDesc", { required: true })}
                        className="min-h-[140px] w-full"
                    />
                    {errors.courseShortDesc && (
                        <span>Course Description is required</span>
                    )}
                </div>

                {/* Price */}
                <div className="relative">
                    <label>Course Price<sup>*</sup></label>
                    <input
                        type="number"
                        id="coursePrice"
                        placeholder="Enter course price"
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                        className="w-full pl-8"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-2 top-2 text-lg" />
                    {errors.coursePrice && <span>Course Price is required</span>}
                </div>

                {/* Category */}
                <div>
                    <label>Course Category <sup>*</sup></label>
                    <select
                        id="courseCategory"
                        defaultValue=""
                        {...register("courseCategory", { required: true })}
                        onChange={(e) => {
                            // disable select after choosing
                            e.target.disabled = true;
                        }}
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>

                    {errors.courseCategory && (
                        <span>Course category is required</span>
                    )}
                </div>



                {/* Benefits */}
                <div>
                    <label>
                        Benefits of the course <sup>*</sup>
                    </label>
                    <textarea
                        id="courseBenefits"
                        placeholder="Enter benefits of the course"
                        {...register("courseBenefits", { required: true })}
                        className="min-h-[130px] w-full"
                    />
                    
                    {errors.courseBenefits && (
                        <span>Benefits of the course are required</span>
                    )}
                </div>

                {/* Requirements */}
                <RequirementField
                    name="courseRequirements"
                    label="Requirements / Instructions"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValue={getValues}
                />

                {/* Buttons */}
                <div className="flex gap-x-4">
                    {editCourse && (
                        <button
                            type="button"
                            onClick={() => dispatch(setStep(2))}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Continue without Saving
                        </button>
                    )}
                    <IconBtn
                        type="submit"
                        text={!editCourse ? "Next" : "Save Changes"}
                    />
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;
