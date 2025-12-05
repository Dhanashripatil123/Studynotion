import RenderStep from "./RenderStep"

export default function AddCourse(){
   return(
      <>
        <div className="text-white">
             <div>
                <h1>Add courses</h1>
                <div>
                    < RenderStep></RenderStep>                             
                   </div>                                  
             </div>  
             <div>
                <p>Code Upload Tips</p> 
                <ul>
                   <li>Set the courses price option or make it free.</li> 
                   <li>Standars size for the course thumbnail is 1024x567</li>
                   <li>video section controls the courses overview video</li>                              
                   <li>Set the courses price option or make it free.</li> 
                   <li>Standars size for the course thumbnail is 1024x567</li>
                   <li>video section controls the courses overview video</li>                              
                   <li>Set the courses price option or make it free.</li> 
                   <li>Standars size for the course thumbnail is 1024x567</li>
                   <li>video section controls the courses overview video</li>                              
                </ul>                                  
             </div>                                  
        </div>
      </>                                            
   )                                               
}