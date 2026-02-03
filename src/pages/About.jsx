import React from 'react'
import HighlightText from "../components/core/Homepage/HighlightText"
import CTAButton from "../components/core/Homepage/Button"
import girl_1 from "../assets/Images/girl_1.webp"
import girl_2 from "../assets/Images/girl_2.webp"
import girl_3 from "../assets/Images/girl_3.webp"
import Quote from '../components/core/Aboutepage/Quote'
import group1 from "../assets/Images/group1.webp"
import { StateComponenets } from '../components/core/Aboutepage/State'
import { LearningGrid } from '../components/core/Aboutepage/LearningGrid'
import { ContactFormSection } from '../components/core/Aboutepage/ContactFormSection'
import FooterLinks2 from "../components/FooterLink2"
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#061021] to-[#091026] text-white pt-24 pb-24'>
      <section className='mx-auto w-11/12 max-w-6xl mb-16 text-center'>
        <h1 className='text-4xl md:text-5xl font-extrabold mb-4 leading-tight'>Driving Innovation in Online Education for a<HighlightText text=" Brighter Future" /></h1>
        <p className='text-lg md:text-xl text-richblack-300 max-w-3xl mx-auto leading-relaxed mb-8'>Studynotion is at the forefront of driving innovation in online education — offering cutting-edge courses, real-world projects, and a vibrant learning community.</p>
        <div className='flex items-center justify-center gap-4'>
          <CTAButton active={true} linkto={'/signup'}>Get Started</CTAButton>
          <CTAButton active={false} linkto={'/courses'}>Browse Courses</CTAButton>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10'>
          <img src={girl_1} alt="Team 1" className="w-full h-56 object-cover rounded-lg shadow-lg hover:scale-105 transition"/>
          <img src={girl_2} alt="Team 2" className="w-full h-56 object-cover rounded-lg shadow-lg hover:scale-105 transition"/>
          <img src={girl_3} alt="Team 3" className="w-full h-56 object-cover rounded-lg shadow-lg hover:scale-105 transition"/>
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

      {/* Inserted heading above reviews (below send message) */}
      <section className='mx-auto w-11/12 max-w-6xl mb-8 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-2'>Success Stories from Our Community</h2>
        <p className='text-richblack-300 text-lg'>See what learners have to say about their experience with StudyNotion</p>
      </section>
      <div><ReviewSlider></ReviewSlider></div>
      <div><FooterLinks2 /></div>
    </div>
  )
}

export default About
