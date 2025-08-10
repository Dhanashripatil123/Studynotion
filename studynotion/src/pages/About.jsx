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
                                                                                                    <div className='mt-[100px] text-white'>
                                                                                                                                                      {/* section 1 */}
                                                                                                                                                      <section>
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                          <header>
                                                                                                                                                                                                                                                                                                            Driving Innovation in Online Education for a
                                                                                                                                                                                                                                                                                                            <HighlightText text="Brighter Future" />
                                                                                                                                                                                                                                                                                                            <p>Studynotion is at the forefront of driving innovation in online education. We are passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                                                                                                                                                                                                                                                          </header>
                                                                                                                                                                                                                                                          <div className='flex gap-x-3 mx-auto'>
                                                                                                                                                                                                                                                                                                            <img src={girl_1}></img>
                                                                                                                                                                                                                                                                                                            <img src={girl_2}></img>
                                                                                                                                                                                                                                                                                                            <img src={girl_3}></img>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                      </section>

                                                                                                                                                      {/* section 2*/}
                                                                                                                                                      <section>
                                                                                                                                                                                                        <Quote></Quote>
                                                                                                                                                      </section>

                                                                                                                                                      {/* section 3*/}
                                                                                                                                                      <section className='flex flex-col'>
                                                                                                                                                                                                        <div className='flex'>
                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                                                                                                                                              <h1>Our Founding story</h1>
                                                                                                                                                                                                                                                                                                                                                              <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                                                                                                                                                                                                                                                                                                                                                              <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

                                                                                                                                                                                                                                                                                                                                                              <img src={group1}>
                                                                                                                                                                                                                                                                                                                                                              </img>
                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                          {/* left box */}
                                                                                                                                                                                                                                                          <div className='flex'>
                                                                                                                                                                                                                                                                                                            <h1>Our Vision</h1>
                                                                                                                                                                                                                                                                                                            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                          {/* {right box} */}

                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                                                            <h1>Our Mission</h1>
                                                                                                                                                                                                                                                                                                            <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                        </div>
                                                                                                                                                      </section>

                                                                                                                                                      {/* section4 */}
                                                                                                                                                      <div><StateComponenets></StateComponenets></div>

                                                                                                                                                      {/* {section5} */}
                                                                                                                                                      <section className='mx-auto flex flex-col items-center justify-between gap-5'>
                                                                                                                                                         <LearningGrid></LearningGrid>  
                                                                                                                                                         <ContactFormSection></ContactFormSection>                                            
                                                                                                                                                      </section>

                                                                                                                                                      <section className='mt-5'>
                                                                                                                                                         <div>
                                                                                                                                                            Reviews from other learners
                                                                                                                                                         </div>
                                                                                                                                                      </section>

                                                        <FooterLinks2/>






                                                                                                    </div>
                                                  )
}

export default About
