import RatingStars from "../../common/RatingStars"
import {useState} from 'react';
import { Link } from "react-router-dom";
//import GetAvgRating  from '../utils/GetAvgRating'

const Course_Card = ({ course, Height = 'h-[220px]' }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    const instructorFirst = course?.instructor?.firstName ?? '';
    const instructorLast = course?.instructor?.lastName ?? '';
    const ratingArrayLength = (course?.ratingAndReview?.length ?? course?.RatingAndReview?.length ?? 0);
    const imgSrc = course?.thumbnail || '';
    const id = course?._id || course?.courseId;

    return (
        <div className="p-3">
            <Link to={`/course/${id}`} className="block bg-[#0b1724] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                <div className={`w-full overflow-hidden bg-gray-800 ${Height} relative`}> 
                    {imgSrc ? (
                        <img src={imgSrc} alt={course?.courseName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">₹{course?.price || '0'}</div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{course?.courseName}</h3>
                    <div className="text-sm text-gray-400 mt-1">{(instructorFirst + ' ' + instructorLast).trim() || 'Unknown'}</div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="text-sm text-gray-300">{ratingArrayLength}</span>
                        </div>
                        <div className="text-sm text-gray-300">{course?.level || ''}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Course_Card