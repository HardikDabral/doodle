'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AboutUs = () => {
  const aboutRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, textRef.current], { 
        opacity: 0, 
        y: 50 
      })
      
      // Animate elements in sequence
      gsap.timeline()
        .to(titleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "back.out(1.7)" 
        })
        .to(textRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }, "-=0.5")

      // Floating animation for content
      gsap.to(contentRef.current, {
        y: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Parallax scroll effects for About section - wait for elements
      setTimeout(() => {
        if (contentRef.current) {
          gsap.fromTo(contentRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.8
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true
            }
          })
        }

        if (aboutRef.current) {
          // Background parallax effect
          gsap.to(aboutRef.current, {
            backgroundPosition: "50% 100%",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true
            }
          })
        }
      }, 100)
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={aboutRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-0"
      style={{
        backgroundImage: 'url(/images/About.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content in the center */}
      <div 
        ref={contentRef}
        className="relative z-10 text-center px-4 md:px-8 max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl"
        style={{
          border: '4px solid #000',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
      >
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-black mb-8"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          About <span style={{ color: '#f99e1c' }}>Me</span>
        </h2>
        
        <p 
          ref={textRef}
          className="text-lg md:text-xl text-black leading-relaxed"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          I&apos;m a passionate graphic designer who specializes in creating whimsical, 
          hand-drawn doodles that bring joy and creativity to every project. With a 
          love for playful illustrations and a keen eye for detail, I transform ideas 
          into delightful visual stories that capture the imagination.
        </p>
        
        <div className="mt-8">
          <button
            onClick={() => {
              window.open('https://www.linkedin.com/in/bishu-singh-312b57209', '_blank', 'noopener,noreferrer');
            }}
            className="relative inline-block px-8 py-4 text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: '#f99e1c',
              boxShadow: '0 4px 15px rgba(249, 158, 28, 0.3)',
              border: '2px solid #000',
              borderRadius: '50px'
            }}
          >
            Let&apos;s Create Together
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs