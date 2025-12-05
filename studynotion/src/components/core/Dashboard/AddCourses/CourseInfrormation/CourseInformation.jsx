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

    const [courseCategories, setCourseCategories] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const handleThumbnailChange = (e) => {
        const f = e.target.files && e.target.files[0];
        setThumbnailFile(f || null);
    };

    const handleThumbnailUrlChange = (e) => {
        setThumbnailUrl(e.target.value || "");
        // Clear selected file if user enters a URL
        if (e.target.value) setThumbnailFile(null);
    };

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCourseCategories();
            if (categories?.length > 0) {
                setCourseCategories(categories);
            }
        };

        if (editCourse && course) {
            setValue("courseTitle", course.courseName || "");
            setValue("courseShortDesc", course.courseDescription || "");
            setValue("coursePrice", course.price || "");
            // setValue("courseTags", course.tag || []);
            setValue("courseBenefits", course.whatYouWillLearn || "");
            // store category as id when available (category may be populated object or string)
            setValue("courseCategory", course.category?._id || course.category || "");
            setValue("courseRequirements", course.instruction || []);
            // setValue("courseImages", course.thumbnail || "");
            setValue("courseThumbnailUrl", course.thumbnail || "");
            setThumbnailUrl(course.thumbnail || "");
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
            // compare selected category id to original (handle populated object or plain id)
            currentValues.courseCategory !== (course.category?._id || course.category) ||
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
            // category stored as id in the form; only append when changed
            if (data.courseCategory !== (course.category?._id || course.category))
                formData.append("category", data.courseCategory);
            if (
                data.courseRequirements?.toString() !== course.instruction?.toString()
            )
                formData.append("instructions", JSON.stringify(data.courseRequirements));

            const result = await editCourseDetails(formData, token);

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
            // add category id
            formData.append("category", data.courseCategory);
                // append tag (backend expects 'tag') - default to 'general' if not provided
                formData.append("tag", data.courseTag || "general");
            // append thumbnail: prefer file, fallback to URL
            if (thumbnailFile) {
                formData.append("thumbnail", thumbnailFile);
            } else if (thumbnailUrl) {
                formData.append("thumbnail", thumbnailUrl);
            }
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("status", COURSE_STATUS.DRAFT);

            const result = await addCourseDetails(formData, token);
            if (result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Course Information</h1>
                <p className="text-gray-400">Add details about your course to help students understand what they'll learn</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                {/* Course Title Section */}
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                    
                    {/* Course Title */}
                    <div className="mb-6">
                        <label className="block text-xl font-bold text-white mb-3">
                            Course Title<sup className="text-red-500">*</sup>
                        </label>
                        <input
                            id="courseTitle"
                            placeholder="Enter an engaging course title"
                            {...register("courseTitle", { required: "Course title is required" })}
                            className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-lg"
                        />
                        {errors.courseTitle && <span className="text-red-500 text-sm mt-1 block">{errors.courseTitle.message}</span>}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-xl font-bold text-white mb-3">Course Short Description<sup className="text-red-500">*</sup></label>
                        <textarea
                            id="courseShortDesc"
                            placeholder="Provide a brief overview of your course (max 200 characters)"
                            {...register("courseShortDesc", { required: "Course description is required" })}
                            maxLength="200"
                            className="min-h-[120px] w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 resize-none"
                        />
                        {errors.courseShortDesc && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.courseShortDesc.message}</span>
                        )}
                    </div>
                </div>

                {/* Course Details Section */}
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6">Course Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-3">Course Price<sup className="text-red-500">*</sup></label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="coursePrice"
                                            placeholder="0"
                                            {...register("coursePrice", { required: "Course price is required", valueAsNumber: true })}
                                            className="w-full px-4 py-3 pl-10 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
                                        />
                                        <HiOutlineCurrencyRupee className="absolute left-3 top-4 text-lg text-gray-600" />
                                    </div>
                                    {errors.coursePrice && <span className="text-red-500 text-sm mt-1 block">{errors.coursePrice.message}</span>}
                                </div>

                                {/* Category - enabled and wired to form state */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-3">Course Category <sup className="text-red-500">*</sup></label>
                                    <select
                                        id="courseCategory"
                                        defaultValue=""
                                        {...register("courseCategory", { required: "Course category is required" })}
                                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 font-semibold"
                                    >
                                        <option value="" disabled>
                                            Select a Category
                                        </option>
                                        {/* Static primary options as requested */}
                                        <option value="webdev">Web Development</option>
                                        <option value="ai-ml">AI / ML</option>
                                        <option value="dsa">DSA</option>
                                        {/* Append any categories fetched from API (kept for backward compatibility) */}
                                        {courseCategories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name || cat.firstName || cat.title || cat.label || cat._id}</option>
                                        ))}
                                    </select>

                                    {errors.courseCategory && (
                                        <span className="text-red-500 text-sm mt-1 block">{errors.courseCategory.message}</span>
                                    )}
                                </div>
                                {/* Thumbnail upload */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-3">Course Thumbnail</label>
                                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="w-full text-sm text-gray-500" />
                                    <input
                                        type="text"
                                        id="courseThumbnailUrl"
                                        placeholder="Or paste image URL (https://...)"
                                        value={thumbnailUrl}
                                        onChange={(e) => { handleThumbnailUrlChange(e); setValue('courseThumbnailUrl', e.target.value); }}
                                        className="mt-2 w-full px-3 py-2 rounded-lg text-gray-900"
                                    />
                                </div>
                                {/* Tag */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-3">Course Tag</label>
                                    <input
                                        id="courseTag"
                                        placeholder="e.g. JavaScript, Python"
                                        {...register("courseTag")}
                                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-lg"
                                    />
                                </div>
                            </div>
                </div>

                {/* Course Benefits Section */}
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6">What Will Students Learn?</h2>
                    
                    <div>
                        <label className="block text-xl font-bold text-white mb-3">
                            Benefits of the course <sup className="text-red-500">*</sup>
                        </label>
                        <textarea
                            id="courseBenefits"
                            placeholder="List key learning outcomes and benefits of this course (one per line)"
                            {...register("courseBenefits", { required: "Course benefits are required" })}
                            className="min-h-[150px] w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 resize-none"
                        />
                        
                        {errors.courseBenefits && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.courseBenefits.message}</span>
                        )}
                    </div>
                </div>

                {/* Requirements Section */}
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6">Requirements & Instructions</h2>
                    <RequirementField
                        name="courseRequirements"
                        label="Requirements / Instructions"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValue={getValues}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <div>
                        {editCourse && (
                            <button
                                type="button"
                                onClick={() => dispatch(setStep(2))}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                            >
                                Skip for Now
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            Go Back
                        </button>
                        <IconBtn
                            type="submit"
                            text={!editCourse ? "Next Step" : "Save Changes"}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;
