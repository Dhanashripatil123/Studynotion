import React from 'react'
import CTAButton from '../Homepage/Button'
//import HighlightText from './HighlightText'
import {FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient}) => {
    return (
       <div className={`flex flex-col lg:flex-row ${position} my-20 justify-between gap-10 items-start`}>
           {/*section1*/}
           <div className='lg:w-1/2 w-full flex flex-col gap-6'>
               {heading}
               <div className='text-richblack-300 text-lg'>
                  {subheading}
               </div>

              <div className='flex flex-wrap gap-4 mt-4'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                             {ctabtn1.btnText}
                             <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                       {ctabtn2.btnText}
                    </CTAButton>
              </div>
            </div>

            {/* {section 2: Code preview} */}
            <div className='lg:w-1/2 w-full py-4'>
                <div className='bg-richblack-800 rounded-xl overflow-hidden shadow-lg border border-richblack-700'>
                    <div className='flex'>
                        {/* line numbers */}
                        <div className='hidden sm:block bg-richblack-900 text-richblack-400 px-3 py-4 font-mono text-sm'>
                            {Array.from({length: 12}).map((_,i)=>(
                                <div key={i} className='leading-6'>{i+1}</div>
                            ))}
                        </div>

                        <div className='w-full p-4 font-mono text-sm text-yellow-300 leading-relaxed whitespace-pre-wrap'>
                            <TypeAnimation
                                sequence={[codeblock, 10000, ""]}
                                repeat={Infinity}
                                cursor={true}
                                style={{
                                    whiteSpace: 'pre-line',
                                    display: 'block'
                                }}
                                omitDeletionAnimation={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default CodeBlocks