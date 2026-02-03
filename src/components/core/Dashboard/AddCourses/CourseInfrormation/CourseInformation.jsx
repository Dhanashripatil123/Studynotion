import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from "./RequirementField";
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
    const STATIC_CATEGORIES = [
        { _id: 'webdev', name: 'Web Development' },
        { _id: 'ai-ml', name: 'AI / ML' },
        { _id: 'dsa', name: 'DSA' },
    ];

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
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-6 md:p-8">
            {/* Enhanced Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
                    Course Information
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Fill in the details below to create an engaging course that students will love
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto space-y-8"
            >
                {/* Course Title Section - Enhanced */}
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-yellow-500/5 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">📚</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Basic Information</h2>
                            <p className="text-gray-400">Start with the fundamentals of your course</p>
                        </div>
                    </div>

                    {/* Course Title */}
                    <div className="mb-8">
                        <label className="block text-xl font-bold text-white mb-4 flex items-center gap-2">
                            Course Title
                            <span className="text-red-500 text-2xl">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="courseTitle"
                                placeholder="Enter an engaging course title that captures attention..."
                                {...register("courseTitle", { required: "Course title is required" })}
                                className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 text-lg placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        {errors.courseTitle && (
                            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <span className="text-red-400 text-sm flex items-center gap-2">
                                    <span>⚠️</span>
                                    {errors.courseTitle.message}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-xl font-bold text-white mb-4 flex items-center gap-2">
                            Course Description
                            <span className="text-red-500 text-2xl">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                                id="courseShortDesc"
                                placeholder="Provide a compelling description that highlights what students will learn and achieve..."
                                {...register("courseShortDesc", { required: "Course description is required" })}
                                maxLength="200"
                                rows="4"
                                className="min-h-[140px] w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 resize-none placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">
                                {getValues("courseShortDesc")?.length || 0}/200
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        {errors.courseShortDesc && (
                            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <span className="text-red-400 text-sm flex items-center gap-2">
                                    <span>⚠️</span>
                                    {errors.courseShortDesc.message}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Course Details Section - Enhanced */}
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-yellow-500/5 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">⚙️</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Course Details</h2>
                            <p className="text-gray-400">Configure pricing, category, and media for your course</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Price */}
                        <div className="md:col-span-1">
                            <label className="block text-xl font-bold text-white mb-4 flex items-center gap-2">
                                Course Price
                                <span className="text-red-500 text-2xl">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="coursePrice"
                                    placeholder="0"
                                    {...register("coursePrice", { required: "Course price is required", valueAsNumber: true })}
                                    className="w-full px-6 py-4 pl-12 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 text-lg placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xl">
                                    <HiOutlineCurrencyRupee />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            {errors.coursePrice && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <span className="text-red-400 text-sm flex items-center gap-2">
                                        <span>⚠️</span>
                                        {errors.coursePrice.message}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="md:col-span-1">
                            <label className="block text-xl font-bold text-white mb-4 flex items-center gap-2">
                                Course Category
                                <span className="text-red-500 text-2xl">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="courseCategory"
                                    defaultValue=""
                                    {...register("courseCategory", { required: "Course category is required" })}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 text-lg font-semibold transition-all duration-300 hover:border-gray-500 appearance-none"
                                >
                                    <option value="" disabled className="bg-gray-800">
                                        Select a Category
                                    </option>
                                    {STATIC_CATEGORIES.map((cat) => (
                                        <option key={cat._id} value={cat._id} className="bg-gray-800">{cat.name}</option>
                                    ))}
                                    {editCourse && course && (course.category?._id || course.category) && !STATIC_CATEGORIES.some(c => c._id === (course.category?._id || course.category)) && (
                                        <option value={course.category?._id || course.category} className="bg-gray-800">
                                            {course.category?.name || course.category?._id || course.category}
                                        </option>
                                    )}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xl pointer-events-none">
                                    ▼
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            {errors.courseCategory && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <span className="text-red-400 text-sm flex items-center gap-2">
                                        <span>⚠️</span>
                                        {errors.courseCategory.message}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-xl font-bold text-white mb-4">Course Thumbnail</label>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-px bg-gray-600"></div>
                                    <span className="text-gray-400 text-sm font-medium">OR</span>
                                    <div className="flex-1 h-px bg-gray-600"></div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="courseThumbnailUrl"
                                        placeholder="Paste image URL (https://...)"
                                        value={thumbnailUrl}
                                        onChange={(e) => { handleThumbnailUrlChange(e); setValue('courseThumbnailUrl', e.target.value); }}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        {/* Tag */}
                        <div className="md:col-span-2">
                            <label className="block text-xl font-bold text-white mb-4">Course Tag</label>
                            <div className="relative">
                                <input
                                    id="courseTag"
                                    placeholder="Add relevant tags (e.g., beginner, advanced, web development)"
                                    {...register("courseTag")}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Benefits Section */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 rounded-2xl"></div>
                    <div className="relative">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">What Will Students Learn?</h2>
                        
                        <div>
                            <label className="block text-xl font-bold text-white mb-4">
                                Benefits of the course <sup className="text-red-500">*</sup>
                            </label>
                            <div className="relative">
                                <textarea
                                    id="courseBenefits"
                                    placeholder="List key learning outcomes and benefits of this course (one per line)"
                                    {...register("courseBenefits", { required: "Course benefits are required" })}
                                    className="min-h-[180px] w-full px-6 py-5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border-2 border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 resize-none"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            
                            {errors.courseBenefits && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <span className="text-red-400 text-sm font-medium">{errors.courseBenefits.message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Requirements Section */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 rounded-2xl"></div>
                    <div className="relative">
                        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Requirements & Instructions</h2>
                        <RequirementField
                            name="courseRequirements"
                            label="Requirements / Instructions"
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValue={getValues}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-8">
                    <div>
                        {editCourse && (
                            <button
                                type="button"
                                onClick={() => dispatch(setStep(2))}
                                className="relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-600"
                            >
                                Skip for Now
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-600"
                        >
                            Go Back
                        </button>
                        <button
                            type="submit"
                            className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-yellow-500/25"
                        >
                            {!editCourse ? "Next Step" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CourseInformation;
