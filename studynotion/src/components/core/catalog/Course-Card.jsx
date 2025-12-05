import RatingAndReview from "../../../../SERVER/models/RatingAndReview"
import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";

const Course_Card = ({course,Height})=>{

       const [avgReviewCount,setAvgReviewCount] = useState(0);  
       
       useEffect(()=>{    
          const count= GetAvgRating(course.RatingAndReview)
          setAvgReviewCount(count)
},[course])
    return(
        <div>
             <Link to={`/courses/${course._id}`}>
                <div>
                    <img src={course?.thumbnail} alt="course ka thumbnail" className={`${Height} w-full rounded-xl object-cover`}></img>                              
                </div>
                <div>
                   <p>{course?.courseName}</p>                            
                   <p>{course?.instructor?.firstName} {course?.instructor.lastName}</p>  
                   <span>{avgReviewCount || 0}</span> 
                   <RatingAndReview Review_Count={avgReviewCount}/>
                   <span>{course?.RatingAndReview?.length} Rating</span>                         
                </div>
                <p>{course?.price}</p>
             </Link>                                     
        </div>                                          
    )  
}

export default Course_Card