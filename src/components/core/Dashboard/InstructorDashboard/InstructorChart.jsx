import React, { useState, useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale)

function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState('Students')

  const labels = useMemo(() => courses.map((c) => c.courseName || 'Untitled'), [courses])

  const getRandomColors = (n) => {
    const colors = []
    for (let i = 0; i < n; i++) {
      const r = Math.floor(Math.random() * 200) + 30
      const g = Math.floor(Math.random() * 200) + 30
      const b = Math.floor(Math.random() * 200) + 30
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`)
    }
    return colors
  }

  const data = useMemo(() => {
    const values = courses.map((c) => (currChart === 'Students' ? (c.totalStudentsEnrolled || 0) : (c.totalAmountGenerated || 0)))
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: getRandomColors(values.length),
          borderWidth: 1,
        },
      ],
    }
  }, [courses, currChart, labels])

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        ticks: { beginAtZero: true },
      },
    },
  }

  if (!courses || courses.length === 0) {
    return (
      <div className='p-4 bg-white rounded'>
        <h3 className='font-semibold mb-2'>Instructor Summary</h3>
        <div>No course data available to render chart.</div>
      </div>
    )
  }

  return (
    <div className='p-4 bg-white rounded'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='font-semibold'>Instructor Chart</h3>
        <div className='flex gap-2'>
          <button className={`px-2 py-1 rounded ${currChart === 'Students' ? 'bg-blue-600 text-white' : 'bg-gray-800'}`} onClick={() => setCurrChart('Students')}>
            Students
          </button>
          <button className={`px-2 py-1 rounded ${currChart === 'Income' ? 'bg-blue-600 text-white' : 'bg-gray-800'}`} onClick={() => setCurrChart('Income')}>
            Income
          </button>
        </div>
      </div>
      <PolarArea data={data} options={options} />
    </div>
  )
}

export default InstructorChart



