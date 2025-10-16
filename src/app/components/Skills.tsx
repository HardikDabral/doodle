'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsGridRef = useRef<HTMLDivElement>(null)

  const skills = [
    { name: 'Painting', level: 95 },
    { name: 'Sketching', level: 90 },
    { name: 'AI', level: 88 },
    { name: 'Color Theory', level: 92 },
    { name: 'Adobe Photoshop', level: 99 },
    { name: 'Adobe Illustrator', level: 98 },
    { name: 'After Effects', level: 88},
    { name: 'Autodesk 3ds Max', level: 90 }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current], { 
        opacity: 0, 
        y: 50 
      })
      
      gsap.set(".skill-item", {
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

      // Staggered animation for skill items
      gsap.to(".skill-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate skill bars
      gsap.to(".skill-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @media (max-width: 767px) {
          .skills-container {
            background-image: none !important;
          }
        }
      `}</style>
      <div 
        ref={skillsRef}
        className="skills-container relative min-h-screen py-20 px-8 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/Skills.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      {/* Content in the center */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-black mb-16"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          My <span style={{ color: '#f99e1c' }}>Skills</span>
        </h2>
        
        <div 
          ref={skillsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item relative group"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '25px',
                padding: '2.5rem 2rem',
                border: '4px solid #000',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative corner elements */}
              <div 
                className="absolute top-2 right-2 w-6 h-6"
                style={{
                  border: '3px solid #f99e1c',
                  borderRadius: '50%',
                  opacity: 0.7
                }}
              />
              <div 
                className="absolute bottom-2 left-2 w-4 h-4"
                style={{
                  backgroundColor: '#f99e1c',
                  borderRadius: '50%',
                  opacity: 0.6
                }}
              />
              
              <h3 
                className="text-2xl font-bold text-black mb-6 text-center"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {skill.name}
              </h3>
              
              {/* Skill bar container */}
              <div 
                className="w-full bg-gray-100 rounded-full h-6 mb-4 relative"
                style={{
                  border: '3px solid #000',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div 
                  className="skill-bar h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(135deg, #f99e1c 0%, #ff6b35 50%, #f99e1c 100%)',
                    boxShadow: '0 2px 8px rgba(249, 158, 28, 0.3)',
                    position: 'relative'
                  }}
                >
                  {/* Animated shine effect */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      animation: 'shine 2s infinite'
                    }}
                  />
                </div>
              </div>
              
              <div 
                className="text-lg font-bold text-center"
                style={{
                  color: '#f99e1c',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                  fontFamily: 'var(--font-kalam), cursive'
                }}
              >
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <button
            onClick={() => {
              const contactSection = document.querySelector('[data-section="contact"]') || 
                                    document.querySelector('.contact-section') ||
                                    document.querySelector('section:last-of-type');
              if (contactSection) {
                contactSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="relative inline-block px-8 py-4 text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: '#f99e1c',
              boxShadow: '0 4px 15px rgba(249, 158, 28, 0.3)',
              border: '3px solid #000',
              borderRadius: '50px'
            }}
          >
            Let&apos;s Work Together
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Skills