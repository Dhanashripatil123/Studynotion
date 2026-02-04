import React from "react";

const IconButton = ({
   text,
   onClick,
   children,
   disabled = false,
   outline = true,
   customClasses = "",
   type = "button",
}) => {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         type={type}
         className={`${outline ? "border" : ""} ${customClasses}`}
      >
         {children ? (
            <>
               <span>{text}</span>
               {children}
            </>
         ) : (
            text
         )}
      </button>
   );
};

export default IconButton;
