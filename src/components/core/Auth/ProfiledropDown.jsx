import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
import Avatar from '../../common/Avatar'

const ProfiledropDown = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('click', h)
    return () => window.removeEventListener('click', h)
  }, [])

  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false)
  }

  return (
    <div className="relative flex items-center gap-2" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        className="flex items-center gap-2 p-1 rounded-full bg-[#2C333F] text-white hover:bg-gray-700 transition"
      >
        <Avatar size="sm" />
        <IoIosArrowDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#0b1220] border border-gray-700 rounded shadow-lg p-3 z-50">
          <div className="flex flex-col gap-2">
            <Link
              to="/dashboard/my-profile"
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2 px-3 rounded-md text-white hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2 px-3 rounded-md text-white hover:bg-gray-800 transition"
            >
              Settings
            </Link>
            <hr className="border-gray-600 my-2" />
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2 px-3 rounded-md text-yellow-400 hover:bg-gray-800 transition"
            >
              Switch Account (Login)
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2 px-3 rounded-md text-blue-400 hover:bg-gray-800 transition"
            >
              Create New Account (Sign up)
            </Link>
            <hr className="border-gray-600 my-2" />
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 px-3 rounded-md text-red-400 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfiledropDown