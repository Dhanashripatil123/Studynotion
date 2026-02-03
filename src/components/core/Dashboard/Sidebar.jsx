import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import  SidebarLink from "./sidebarLinks";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
   const { user, loading: profileLoading } = useSelector((state) => state.profile);
   const { loading: authLoading } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [confirmationModal, setConfirmationModal] = useState(null);

   if (profileLoading || authLoading) {
      return <div className="mt-10">Loading...</div>;
   }

   return (
      <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-black h-[calc(100vh-3.5rem)] bg-black py-10 text-white">
         <div className="flex flex-col">
            {sidebarLinks.map((link) => {
               if (link.type && user?.accountType !== link.type) return null;
               return <SidebarLink key={link.id} link={link} />;
            })}
         </div>

         <div className="mt-auto px-8">
            <button
               onClick={() =>
                  setConfirmationModal({
                     text1: "Are you sure?",
                     text2: "You will be logged out of your account",
                     btn1Text: "Logout",
                     btn2Text: "Cancel",
                     btn1Handler: () => {
                        dispatch({ type: "LOGOUT" });
                        navigate("/");
                     },
                     btn2Handler: () => setConfirmationModal(null),
                  })
               }
               className="flex items-center gap-x-2 text-sm font-medium"
            >
               <GoSignOut className="text-lg" />
               <span>Logout</span>
            </button>
         </div>

         {confirmationModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
               {/* Replace with your Modal component */}
               <div className="bg-white p-4 rounded shadow-lg text-black">
                  <p className="font-bold">{confirmationModal.text1}</p>
                  <p>{confirmationModal.text2}</p>
                  <div className="flex gap-2 mt-4">
                     <button
                        onClick={confirmationModal.btn1Handler}
                        className="bg-red-500 px-3 py-1 text-white rounded"
                     >
                        {confirmationModal.btn1Text}
                     </button>
                     <button
                        onClick={confirmationModal.btn2Handler}
                        className="bg-gray-300 px-3 py-1 rounded"
                     >
                        {confirmationModal.btn2Text}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Sidebar;
