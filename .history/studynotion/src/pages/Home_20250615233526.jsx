import React from 'react'


const Home = () => {
return(
   <div>
      {/*Section 1*/}

      <div className='relative mx-auto flex flex-col w-11/12  item-center text-white justify-between'>
             <Link to={"/signup"}>
                 <div className='group mt-16 p-1 mx-auto rouded-full bg-richblack-800 font-bold text-richblack-200 transition-all-duration-200 hover:scale-95 w-fit'>
                     <div className='flex flex-row item-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>                            
                    <p>Become a Instructor</p>  
                    <FaArrowRight/>     
                    </div>                        
                 </div>
             </Link> 
             </div>

      {/*Section 2*/} 
      {/*Section 3*/} 
      {/*Section 1*/} 
   </div>                                               
)


}