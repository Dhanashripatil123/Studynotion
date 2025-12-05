import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI'

const CategoryList = () => {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const list = await fetchCourseCategories()
        setCats(list || [])
      } catch (err) {
        console.error('Failed to load categories', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div>Loading categories...</div>

  return (
    <div className="flex gap-3 flex-wrap">
      {cats.map((c) => (
        <button key={c._id} className="px-3 py-1 bg-gray-800 text-white rounded" onClick={() => navigate(`/catalog/${c._id}`)}>
          {c.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryList
