import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({
  size = 'md',
  className = '',
  showBorder = true,
  alt = 'User avatar',
  src = null
}) => {
  const { user } = useSelector((state) => state.auth)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  }

  const borderClass = showBorder ? 'border-2 border-yellow-400' : ''

  return (
    <img
      src={src || user?.image}
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]} ${borderClass} ${className}`}
    />
  )
}

export default Avatar