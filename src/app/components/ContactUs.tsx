'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Linkedin } from 'lucide-react'
gsap.registerPlugin(ScrollTrigger)

const ContactUs = () => {
  const contactRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      projectType: formData.get('projectType') as string,
      phone: formData.get('phone') as string
    }

    try {
      // Create a simple email using mailto that works reliably
      const emailContent = `New Contact Form Submission from Doodle Website:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Project Type: ${data.projectType}

Submitted at: ${new Date().toLocaleString()}
Website: Doodle Portfolio

Please reply to this email to contact the client.`

      const mailtoLink = `mailto:hardikdabral2@gmail.com?subject=New Contact Form Submission - Doodle Website&body=${encodeURIComponent(emailContent)}`
      
      // Open email client
      window.open(mailtoLink)
      
      alert('Thank you! Your email client will open. Please send the email to complete your submission.')
      e.currentTarget.reset()
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error sending your message. Please try again or contact us directly.')
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current], { 
        opacity: 0, 
        y: 50 
      })
      
      gsap.set(".contact-item", {
        opacity: 0,
        y: 100,
        scale: 0.8
      })
      
      // Animate title
      gsap.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "back.out(1.7)" 
      })

      // Staggered animation for contact items
      gsap.to(".contact-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

    }, contactRef)

    return () => ctx.revert()
  }, [])


  return (
    <>
      <style jsx>{`
        @media (max-width: 767px) {
          .contact-section {
            background-image: none !important;
            background-color: #ffc542 !important;
          }
        }
      `}</style>
      <div 
        ref={contactRef}
        data-section="contact"
        className="contact-section relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/contactUs/Contact.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
      
      <div className="relative z-20 max-w-6xl mx-auto w-full px-8">
        <div className="flex justify-center">
          {/* Simple Form - Full Width */}
          <div 
            ref={contentRef}
            className="contact-item rounded-2xl p-6 shadow-xl w-full max-w-4xl backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 
              ref={titleRef}
              className="text-2xl md:text-3xl font-bold text-black mb-4 text-center"
              style={{
                fontFamily: 'var(--font-kalam), cursive'
              }}
            >
              Get In <span style={{ color: '#f99e1c' }}>Touch</span>
            </h2>
            
            <p 
              className="text-gray-600 mb-6 text-center text-sm"
              style={{
                fontFamily: 'var(--font-gloria-hallelujah), cursive'
              }}
            >
              Ready to bring your ideas to life?
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name and Email Fields - One Line */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-3 text-sm text-black placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-3 text-sm text-black placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-3 text-sm text-black placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                    required
                  />
                </div>
              </div>

              {/* Project Type, Phone No, and Submit Button - One Line */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <select
                    name="projectType"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-3 text-sm text-black focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="logo">Logo Design</option>
                    <option value="branding">Brand Identity</option>
                    <option value="illustration">Illustration</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="print">Print Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-3 text-sm text-black placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-md text-white font-bold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: '#f99e1c',
                      background: 'linear-gradient(135deg, #f99e1c 0%, #ff6b35 100%)',
                      fontFamily: 'var(--font-kalam), cursive',
                      boxShadow: '0 4px 15px rgba(249, 158, 28, 0.3)'
                    }}
                  >
                    Start Your Project
                  </button>
                </div>
              </div>
            </form>

            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:block mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-row items-center justify-center space-x-8 text-sm text-gray-600">
                <a 
                  href="mailto:Singhbishu098@gmail.com"
                  className="flex items-center space-x-2 hover:text-orange-500 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                >
                  <Mail size={18} className="text-orange-500" />
                  <span>Singhbishu098@gmail.com</span>
                </a>
                
                <a 
                  href="tel:+919369207536"
                  className="flex items-center space-x-2 hover:text-orange-500 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                >
                  <Phone size={18} className="text-orange-500" />
                  <span>9369207536</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/bishu-singh-312b57209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-orange-500 transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-gloria-hallelujah), cursive' }}
                >
                  <Linkedin size={18} className="text-orange-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactUs