import RenderStep from "./RenderStep"

export default function AddCourse(){
   return(
      <>
         <div className="text-white">
            <div className="mb-6">
             <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-tight">Add Course</h1>
             <p className="text-gray-300 mt-1">Create a new course — add sections and lectures below</p>
             <div className="mt-6">
               <RenderStep />                             
                </div>                                  
            </div>  
             <div className="mt-6">
                <div className="bg-gray-800 border border-yellow-400 rounded-lg p-4 text-white max-w-xl">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-8 bg-yellow-400 rounded" />
                      <h3 className="text-lg font-semibold">Code Upload Tips</h3>
                   </div>
                   <ul className="list-disc ml-5 text-gray-200 space-y-1">
                      <li>Set the course price option or make it free.</li>
                      <li>Recommended size for the course thumbnail is 1024×567.</li>
                      <li>The video section controls the course overview video.</li>
                      <li>Use descriptive lecture titles for better discoverability.</li>
                      <li>Keep lecture files under 500MB for smoother uploads.</li>
                   </ul>
                </div>
             </div>
        </div>
      </>                                            
   )                                               
}