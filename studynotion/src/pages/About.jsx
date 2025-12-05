import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import girl_1 from "../assets/Images/girl_1.webp"
import girl_2 from "../assets/Images/girl_2.webp"
import girl_3 from "../assets/Images/girl_3.webp"
import Quote from '../components/core/Aboutepage/Quote'
import group1 from "../assets/Images/group1.webp"
import { StateComponenets } from '../components/core/Aboutepage/State'
import { LearningGrid } from '../components/core/Aboutepage/LearningGrid'
import { ContactFormSection } from '../components/core/Aboutepage/ContactFormSection'
import FooterLinks2 from "../components/FooterLink2"

const About = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white pt-20 pb-20'>
      <section className='mx-auto w-11/12 max-w-7xl mb-20'>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Driving Innovation in Online Education for a <HighlightText text=" Brighter Future" /></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Studynotion is at the forefront of driving innovation in online education. We are passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        <div className='flex gap-4 mx-auto justify-center flex-wrap'>
          <img src={girl_1} alt="Team 1" className="w-64 h-64 rounded-lg shadow-lg hover:scale-105 transition"/>
          <img src={girl_2} alt="Team 2" className="w-64 h-64 rounded-lg shadow-lg hover:scale-105 transition"/>
          <img src={girl_3} alt="Team 3" className="w-64 h-64 rounded-lg shadow-lg hover:scale-105 transition"/>
        </div>
      </section>

      <section className='mx-auto w-11/12 max-w-7xl mb-20 py-12 border-t border-gray-700'>
        <Quote />
      </section>

      <section className='mx-auto w-11/12 max-w-7xl mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition">
            <h2 className="text-3xl font-bold mb-4">Our Founding Story</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className="text-gray-300 leading-relaxed">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className="flex items-center justify-center">
            <img src={group1} alt="Team" className="w-full h-auto rounded-xl shadow-lg"/>
          </div>
        </div>
      </section>

      <section className='mx-auto w-11/12 max-w-7xl mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-8 border border-yellow-500 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
            <p className="text-gray-900 leading-relaxed">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 border border-blue-500 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-gray-900 leading-relaxed">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </div>
      </section>

      <section className='mx-auto w-11/12 max-w-7xl mb-20 py-12 border-t border-gray-700'>
        <StateComponenets />
      </section>

      <section className='mx-auto w-11/12 max-w-7xl space-y-20 mb-20'>
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose <HighlightText text="StudyNotion?" /></h2>
          <LearningGrid />
        </div>
        <div>
          <ContactFormSection />
        </div>
      </section>

      <section className='mx-auto w-11/12 max-w-7xl mb-20 py-12 border-t border-gray-700'>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Success Stories from Our <HighlightText text="Community" /></h2>
          <p className="text-gray-300 text-lg">Hear from learners who have transformed their careers with StudyNotion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition hover:shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-gray-900">{item}</div>
                <div>
                  <p className="font-semibold text-lg">Success Story {item}</p>
                  <p className="text-gray-400 text-sm">Verified Learner</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"This platform completely transformed my learning journey. The instructors are exceptional and the community support is incredible!"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterLinks2 />
    </div>
  )
}

export default About
