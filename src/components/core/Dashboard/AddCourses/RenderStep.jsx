import { FaCheck } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseInformation from "./CourseInfrormation/CourseInformation"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";

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
      <div className="flex items-center justify-center gap-6 mb-4">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${step === item.id
                  ? "bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/30"
                  : step > item.id
                    ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/30"
                    : "border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500"
                }`}
            >
              {step > item.id ? <FaCheck className="text-sm" /> : <span className="font-semibold">{item.id}</span>}
            </div>

            {/* Enhanced line between steps */}
            {index !== steps.length - 1 && (
              <div className={`h-[2px] transition-all duration-300 ${step > item.id ? "bg-green-500 w-16" : "bg-gray-600 w-16"}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex justify-center gap-20 mt-4">
        {steps.map((item) => (
          <p
            key={item.id}
            className={`text-sm font-medium transition-colors duration-300 ${step === item.id ? "text-yellow-400" : step > item.id ? "text-green-400" : "text-gray-400"
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
