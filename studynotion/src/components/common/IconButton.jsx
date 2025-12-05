import React from "react";

const IconButton = ({
   text,
   onClick,
   children,
   disabled = false,
   outline = true,
   customClasses = "",
   type = "button",
   title = undefined,
}) => {
   const base = "inline-flex items-center gap-2 font-semibold transition-transform active:scale-95";
   const outlineClasses = "px-4 py-2 rounded-md border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black";
   const filledClasses = "px-4 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-600";

   const classes = `${base} ${outline ? outlineClasses : filledClasses} ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${customClasses}`;

   return (
      <button
         onClick={onClick}
         disabled={disabled}
         type={type}
         title={title}
         className={classes}
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
