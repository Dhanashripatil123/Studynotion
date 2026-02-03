import React from 'react';
import ReactStars from 'react-stars';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white border-4 border-gray-300 rounded-lg shadow-lg p-6 m-4 max-w-sm mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
      {/* Screenshot-like border */}
      <div className="border-2 border-gray-400 rounded-md p-4 bg-gray-50">
        <div className="flex items-center mb-4">
          <img
            src={review.user.image || 'https://via.placeholder.com/40'}
            alt={`${review.user.firstName} ${review.user.lastName}`}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{review.user.firstName} {review.user.lastName}</h3>
            <p className="text-sm text-gray-600">{review.course.courseName}</p>
          </div>
        </div>
        <div className="mb-4">
          <ReactStars
            count={5}
            value={review.rating}
            size={20}
            color2={'#ffd700'}
            edit={false}
          />
        </div>
        <p className="text-gray-700">{review.review || 'No review text available.'}</p>
      </div>
    </div>
  );
};

export default ReviewCard;