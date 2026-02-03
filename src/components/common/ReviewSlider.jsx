import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ReactStars from 'react-stars'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { apiConnector } from '../../services/apiconnector';
import { ratingEndpoints } from '../../services/apis';
import { FaStar } from 'react-icons/fa';

function ReviewSlider() {

    const [reviews,setReviews] = React.useState([])
    const truncateWords = 15 ;

    const sampleReviews = [
        {
            _id: 'sample1',
            user: { firstName: 'Chikki', lastName: 'Hatkar', image: '' },
            course: { courseName: 'Chikki Hatkar' },
            review: 'cvcvcvc\nbbvhvgvgvb',
            rating: 5
        },
        {
            _id: 'sample2',
            user: { firstName: 'Chikki', lastName: 'Hatkar', image: '' },
            course: { courseName: 'Jay Shri Ram Course' },
            review: 'nhhhjj',
            rating: 5
        },
        {
            _id: 'sample3',
            user: { firstName: 'Anonymous', lastName: '', image: '' },
            course: { courseName: 'Here' },
            review: '',
            rating: 0
        }
    ];

    useEffect(()=>{
                const fetchAllReviews = async()=>{
                     try{
                        const response = await apiConnector("GET", ratingEndpoints.GET_ALL_RATINGS);
                        console.log('loggging response in rating ', response);
                        if (response?.success) {
                            setReviews(response.data || []);
                        } else {
                            setReviews([]);
                        }
                     }catch(err){
                        console.error('Failed to fetch reviews', err);
                        setReviews([]);
                     }
                }
        fetchAllReviews();
    },[])

    const displayReviews = (reviews && reviews.length) ? reviews : sampleReviews;
             
     return (
         <div className='text-white'>
            <div className='h-[220px]'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation={true}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    className="mySwiper h-full"
                >
                    {
                        displayReviews.length === 0 ? (
                            <div className='text-center text-sm text-gray-300 flex items-center justify-center h-full'>No reviews available</div>
                        ) : (
                            displayReviews.map((review, index) => {
                                const reviewerName = `${review?.user?.firstName || ''} ${review?.user?.lastName || ''}`.trim();
                                const courseName = review?.course?.courseName || review?.course?.coursename || 'Course';
                                const avatar = review?.user?.image || `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(reviewerName || 'user')}`;
                                const text = review?.review || '';
                                const truncated = text.split(' ').slice(0, truncateWords).join(' ');

                                return (
                                        <SwiperSlide key={review._id || index} className='h-full'>
                                        <div className='bg-gradient-to-br from-richblack-700 to-richblack-800 p-6 rounded-xl h-full flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/30 hover:border-yellow-400/60 transform hover:-translate-y-1 relative overflow-hidden group cursor-pointer'>
                                            {/* Gradient overlay on hover */}
                                            <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>

                                            {/* Cart-like header with avatar and user info */}
                                            <div className='flex items-center gap-4 mb-4 relative z-10'>
                                                <div className='relative'>
                                                    <img src={avatar} alt={reviewerName} className='w-14 h-14 rounded-full object-cover border-2 border-yellow-400/50 shadow-md' />
                                                    <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center'>
                                                        <FaStar className='w-3 h-3 text-black' />
                                                    </div>
                                                </div>
                                                <div className='flex-1'>
                                                    <div className='font-bold text-white text-lg group-hover:text-yellow-300 transition-colors duration-200'>{reviewerName || 'Anonymous'}</div>
                                                    <div className='text-sm text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-full inline-block'>{courseName}</div>
                                                </div>
                                            </div>

                                            {/* Review text with better styling */}
                                            <div className='text-sm text-gray-200 mb-4 leading-relaxed flex-1 relative z-10'>
                                                <div className='absolute -left-2 top-0 text-yellow-400 text-2xl opacity-20'>"</div>
                                                {truncated}{text.split(' ').length > truncateWords ? '...' : ''}
                                                <div className='absolute -right-2 bottom-0 text-yellow-400 text-2xl opacity-20'>"</div>
                                            </div>

                                            {/* Enhanced rating section */}
                                            <div className='flex items-center justify-between relative z-10'>
                                                <div className='flex items-center bg-yellow-400/10 px-3 py-2 rounded-lg'>
                                                    <ReactStars
                                                        count={5}
                                                        value={Number(review?.rating) || 0}
                                                        size={16}
                                                        edit={false}
                                                        color2={'#ffd700'}
                                                    />
                                                    <span className='ml-2 text-sm font-bold text-yellow-400'>{review?.rating || 0}</span>
                                                </div>
                                                <div className='text-xs text-gray-400 bg-richblack-600 px-2 py-1 rounded-md'>
                                                    Verified Review
                                                </div>
                                            </div>

                                            {/* Subtle bottom accent */}
                                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        )
                    }

                </Swiper>
                </div>
         </div>
      )
}

export default ReviewSlider
