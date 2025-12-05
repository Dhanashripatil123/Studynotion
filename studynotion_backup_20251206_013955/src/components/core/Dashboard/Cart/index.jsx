
import {useSelector} from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import { RenderCartCourses } from "./RenderCartCourses"

export default function Cart(){

    const {total,totalitem} = useSelector((state)=>state.auth)
    return(
         <div>
             <h1>your cart</h1>
             <p>{totalitem} Courses in cart</p>  
             {
                total>0
                ?(<div>
                    <RenderCartCourses></RenderCartCourses>
                    <RenderTotalAmount></RenderTotalAmount>
                </div>)
                :(<p>Your cart is empty</p>)
             }                                 
         </div>                                         
    )                                              
}