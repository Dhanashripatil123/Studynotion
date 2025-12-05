import { FaCheck } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseInformation from "../CourseInfrormation/CourseInformation"
import CourseBuilderForm from "../CourseBuilder/CourseBuilderForm"; import PublishCourse from "./PublishCourse/PublishCourse"; // Uncomment when created

export default function RenderStep() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div>
      {/* Step Circles */}
      <div className="flex items-center gap-4">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === item.id
                  ? "bg-yellow-900 border-yellow-500 text-yellow-500"
                  : step > item.id
                    ? "bg-green-600 border-green-600 text-white"
                    : "border-gray-600 bg-black text-white"
                }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>

            {/* Dash between steps */}
            {index !== steps.length - 1 && (
              <div className="w-10 h-[2px] bg-gray-400"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex gap-8 mt-2">
        {steps.map((item) => (
          <p
            key={item.id}
            className={`text-sm ${step === item.id ? "text-yellow-500" : "text-gray-400"
              }`}
          >
            {item.title}
          </p>
        ))}
      </div>

      {/* Step Components */}
      <div className="mt-6">
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
}
