import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'

export default function AuthDropdown(){
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(()=>{
    const h = (e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false) }
    window.addEventListener('click', h)
    return ()=> window.removeEventListener('click', h)
  },[])

  return (
    <div className="relative" ref={ref}>
      <button onClick={(e)=>{ e.stopPropagation(); setOpen(o=>!o)}} className="p-2 rounded-full bg-[#2C333F] text-white hover:bg-gray-700 transition">
        <IoIosArrowDown className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-[#0b1220] border border-gray-700 rounded shadow-lg p-3">
          <div className="flex flex-col gap-2">
            <Link to="/login" onClick={()=>setOpen(false)} className="block w-full text-center py-2 rounded-md bg-yellow-400 text-black font-semibold hover:brightness-95 transition">
              Login
            </Link>
            <Link to="/signup" onClick={()=>setOpen(false)} className="block w-full text-center py-2 rounded-md border border-gray-700 text-white hover:bg-gray-800 transition">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
