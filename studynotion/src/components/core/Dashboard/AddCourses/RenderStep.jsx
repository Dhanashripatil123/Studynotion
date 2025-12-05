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
      <div className="flex items-center gap-2 md:gap-6">
        {steps.map((item, index) => {
          const isActive = step === item.id;
          const isCompleted = step > item.id;
          return (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  aria-hidden
                  className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-md transition-transform duration-200 transform ${isActive ? "scale-105 ring-4 ring-yellow-300 bg-gradient-to-br from-yellow-500 to-yellow-400 text-black border-yellow-400" : isCompleted ? "bg-green-600 border-green-600 text-white" : "border border-gray-700 bg-gray-900 text-gray-200 hover:scale-105"}`}
                >
                  {isCompleted ? <FaCheck className="text-white" /> : <span className="font-semibold">{item.id}</span>}
                </div>

                <p className={`mt-2 text-xs md:text-sm text-center ${step === item.id ? "text-yellow-400 font-semibold" : "text-gray-400"}`}>
                  {item.title}
                </p>
              </div>

              {/* Dash between steps */}
              {index !== steps.length - 1 && (
                <div className={`${isCompleted ? "w-8 md:w-16 h-1 bg-yellow-400" : "w-8 md:w-16 h-[2px] bg-gray-700"} mx-4 rounded`}></div>
              )}
            </div>
          )
        })}
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
