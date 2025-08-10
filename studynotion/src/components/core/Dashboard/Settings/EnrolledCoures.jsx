import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getUserEnrolledCourses from '../../../../services/operations/profile';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled");
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div>
            <div>Enrolled courses</div>
            {
                !enrolledCourses ? (
                    <div>Loading..</div>
                ) : !enrolledCourses.length ? (
                    <p>You have not enrolled in any courses</p>
                ) : (
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>

                        {enrolledCourses.map((course, index) => (
                            <div key={index}>
                                <div>
                                    <img src={course.thumbnail} alt={course.courseName} />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPersentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPersentage || 0}
                                        height="8px"
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default EnrolledCourses
