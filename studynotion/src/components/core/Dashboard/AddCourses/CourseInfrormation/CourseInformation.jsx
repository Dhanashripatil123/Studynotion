import { useState } from "react";
import { useDispatch } from "react-redux";

const CourseInformation = () => {

 const {
     register,
     handleSumbit,
     setValue,
     getValue,
     formState:{errors},                                            
 }=useForm();
 
 const dispatch = useDispatch();
 const {course,editCourse} = useSelector((state)=>state.course);
 const [loading,setloading] = useState(false)
 const [courseCategories,setCourseCategorie] = useStae([]);

 useEffect(()=>{
    const getcategories = async() =>{
        setLoading(true);
        const categories = await fetchCourseCategories                                         
    }                                              
 })

   return(
       <div>
                                                  
       </div>                                           
   )                                               
}

export default CourseInformation