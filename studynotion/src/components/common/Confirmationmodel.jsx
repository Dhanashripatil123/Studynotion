import React from "react";
import  IconBtn  from "./IconBtn";

export const ConfirmationData = ({modalData})=>{
    return(
      <div>
         <p>
            {modalData.text1}                                      
         </p>
         <p>
            {modalData.text2}                                      
         </p>
         <div>
              <IconBtn
                  onClick={modalData?.btnHandler}
                  text={modalData?.btnText}
              ></IconBtn> 
              <button onClick={modalData?.btn2Handler}>
                 {modalData?.btn2Text}
               </button>                                   
         </div>
      </div>                                            
    )
}