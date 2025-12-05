import { useRef, useState } from "react";
import { imageUpload } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";

export const FileUpload = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.profile);

   const fileInputRef = useRef(null);
   const [selectedFile, setSelectedFile] = useState(null);

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setSelectedFile(file);
      }
   };

   const handleUpload = () => {
      if (!selectedFile) return;
      // Send file to API
      dispatch(imageUpload(user.email, user.firstName, selectedFile));
   };

   return (
      <div>
         {/* Avatar Preview */}
         <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
         />

         {/* Hidden file input */}
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
         />

         {/* Select button triggers input */}
         <button
            className="bg-gray-700 px-4 py-2 mb-0.9 rounded hover:bg-gray-600"
            onClick={() => fileInputRef.current.click()}
         >
            Select
         </button>

         {/* Upload button */}
         <button
            className="bg-yellow-400 text-black gap-12px mb-0.9 rounded hover:bg-yellow-300 ml-2"
            onClick={handleUpload}
         >
            Upload ⬆
         </button>
      </div>
   );
};
