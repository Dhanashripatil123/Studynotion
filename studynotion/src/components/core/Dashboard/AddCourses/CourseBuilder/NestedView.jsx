import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import SubSectionModal from './SubSectionModal';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmatioModal from '../../../../common/Confirmationmodel';
import { deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { deleteSection } from '../../../../../services/operations/courseDetailsAPI';

export default function NestedView ({ handleChangeEditSectionName }){
   
   const { course } = useSelector((state) => state.course);
   
   
   const { token } = useSelector((state) => state.auth);
   
   
   const dispatch = useDispatch();
  

   const [addsubsection, setAddSubSection] = useState(null);
   const [viewsubsection, setViewSubSection] = useState(null);
   const [editsubsection, setEditSubSection] = useState(null);
   const [cofirmationModel, setConfirmationModel] = useState(null);

   const handleDeleteSection = async (sectionId) => {
      const result = await deleteSection({
         sectionId,
         courseid: course._id,
         token
      });

      if (result) {
         dispatch(setCourse(result.course));
      }
      setConfirmationModel(null);
   }

   const handleDeleteSubSection = async (subSectionId, sectionId) => {
      const result = await deleteSubSection({ subSectionId, sectionId, token });
      if (result) {
         dispatch(setCourse(result));
      }
      setConfirmationModel(null);
   }

   return (
      <div>
         <div className='rounded-lg bg-gray-900'>
            {course?.courseContent?.map((section) => {
               return (
                  <details key={section._id} open>
                     <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                        <div className='flex items-center gap-x-3'>
                           <RxDropdownMenu />
                           <p>{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                           <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                              <TbEdit />
                           </button>
                           <button onClick={() => {
                              setConfirmationModel({
                                 text1: "delete this Section",
                                 text2: "All the lecture in this section will be deleted",
                                 btnText: "Delete",
                                 btnText2: "cancel",
                                 btnHadler: () => handleChangeEditSectionName(section._id),
                                 btn2Handler: () => setConfirmationModel(null),
                              })
                           }}>
                              <MdDelete />
                           </button>
                           <span>|</span>
                           <IoCaretDownOutline className={'text-xl text-gray-400'} />
                        </div>
                     </summary>

                     <div>
                        {section.subSection.map((data) => {
                           return (
                              <div key={data?._id} onClick={() => setViewSubSection(data)}
                                 className='flex items-center justify-between gap-x-3 border-b-2'>

                                 <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu />
                                    <p>{data.title}</p>
                                 </div>

                                 <div className='flex items-center gap-x-3'>
                                    <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                       <TbEdit />
                                    </button>
                                    <button
                                       onClick={() => {
                                          setConfirmationModel({
                                             text1: "delete this Sub Section",
                                             text2: "selected Lecture will be deleted",
                                             btnText: "Delete",
                                             btnText2: "cancel",
                                             btnHadler: () => handleDeleteSection(data._id, section._id),
                                             btn2Handler: () => setConfirmationModel(null),
                                          })
                                       }}
                                    >
                                       <MdDelete />
                                    </button>
                                 </div>
                              </div>
                           )
                        })}
                        <button onClick={() => setAddSubSection(section._id)}
                           className='mt-4 flex items-center gap-x-2 text-yellow-300'>
                           <FaPlus />
                           <p>Add Lecture</p>
                        </button>
                     </div>
                  </details>
               )
            })}
         </div>

         {addsubsection ? (
            <SubSectionModal
               modalData={addsubsection}
               setModalData={setAddSubSection}
               add={true}
            />
         ) : viewsubsection ? (
            <SubSectionModal
               modalData={viewsubsection}
               setModalData={setViewSubSection}
               view={true}
            />
         ) : editsubsection ? (
            <SubSectionModal
               modalData={editsubsection}
               setModalData={setEditSubSection}
               edit={true}
            />
         ) : (
            <div></div>
         )}

         {cofirmationModel ? (
            <ConfirmatioModal modalData={cofirmationModel} />
         ) : (
            <div></div>
         )}
      </div>
   
   )
}


