'use client'
import two from '../../../public/images/homepage/one.png'
import one from '../../../public/images/homepage/two.png'
import arrow from '../../../public/images/homepage/Arrow_01.svg'
import arrow1 from '../../../public/images/homepage/Arrow_04.svg'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Herosection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const doodleOneRef = useRef<HTMLImageElement>(null)
  const doodleTwoRef = useRef<HTMLImageElement>(null)
  const arrowOneRef = useRef<HTMLImageElement>(null)
  const arrowTwoRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { 
        opacity: 0, 
        y: 50 
      })
      
      gsap.set([doodleOneRef.current, doodleTwoRef.current], {
        opacity: 0,
        scale: 0.8,
        rotation: 0
      })

      gsap.set([arrowOneRef.current, arrowTwoRef.current], {
        opacity: 0,
        scale: 0.5,
        rotation: 0
      })
      
      // Animate elements in sequence
      gsap.timeline()
        .to(titleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "back.out(1.7)" 
        })
        .to(subtitleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }, "-=0.5")
        .to(ctaRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        }, "-=0.3")
        .to(doodleOneRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 15,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.5")
        .to(doodleTwoRef.current, {
          opacity: 1,
          scale: 1,
          rotation: -10,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        }, "-=0.3")
        .to(arrowOneRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 15,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.2")
        .to(arrowTwoRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 15,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.1")

      // Continuous levitating animation for doodles
      gsap.to(doodleOneRef.current, {
        y: -30,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(doodleTwoRef.current, {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      })

      // Continuous wiggling animation for arrows
      gsap.to(arrowOneRef.current, {
        y: "random(-5, 5)",
        rotation: "random(10, 20)",
        duration: "random(1.5, 2.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      gsap.to(arrowTwoRef.current, {
        y: "random(-2, 2)",
        rotation: "random(10, 20)",
        duration: "random(3, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8
      })

      // Parallax scroll effects - wait for elements to be ready
      setTimeout(() => {
        if (doodleOneRef.current) {
          gsap.to(doodleOneRef.current, {
            y: -100,
            rotation: 30,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true
            }
          })
        }

        if (doodleTwoRef.current) {
          gsap.to(doodleTwoRef.current, {
            y: -80,
            rotation: -20,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true
            }
          })
        }

        if (arrowOneRef.current) {
          gsap.to(arrowOneRef.current, {
            y: -50,
            rotation: 25,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true
            }
          })
        }

        if (arrowTwoRef.current) {
          gsap.to(arrowTwoRef.current, {
            y: -40,
            rotation: -15,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true
            }
          })
        }
      }, 100)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleCTAClick = () => {
    // Bounce animation on CTA click
    gsap.to(ctaRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
    
    // Scroll to Work section
    const workSection = document.querySelector('[data-section="work"]') || 
                       document.querySelector('.work-section') ||
                       document.querySelector('section:nth-of-type(3)');
    if (workSection) {
      workSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-black mb-6"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontFamily: 'var(--font-kalam), cursive'
          }}
        >
          Doodle <span style={{ color: '#f99e1c' }}>Magic</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto"
          style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Where creativity meets <span className="font-bold" style={{ color: '#f99e1c' }}>doodles</span> and 
          design comes to life with every stroke!
        </p>
        
        <button
          ref={ctaRef}
          onClick={handleCTAClick}
          className="relative inline-block px-8 py-4 text-black font-bold text-lg rounded-full transition-colors duration-300 transform hover:scale-105 mt-8 md:mt-16"
          style={{
            backgroundColor: '#f99e1c',
            boxShadow: '0 4px 15px rgba(249, 158, 28, 0.4)',
            border: '3px solid #000',
            borderRadius: '50px'
          }}
        >
          See Projects
        </button>

        {/* Arrow images pointing to CTA */}
        <img
          ref={arrowOneRef}
          src={arrow.src}
          alt="Arrow pointing to CTA"
          className="absolute -bottom-8 left-10 md:-bottom-12 md:left-38 w-20 h-20 md:w-32 md:h-32 pointer-events-none"
          style={{
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
          }}
        />
        
        <img
          ref={arrowTwoRef}
          src={arrow1.src}
          alt="Arrow pointing to CTA"
          className="absolute -bottom-[-50px] right-10 md:-bottom-[-20px] md:right-36 w-20 h-20 md:w-32 md:h-32 pointer-events-none"
          style={{
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
          }}
        />
      </div>

      {/* Doodle images - hidden on mobile */}
      <img
        ref={doodleOneRef}
        src={one.src}
        alt="Doodle decoration"
        className="hidden md:block absolute top-2 right-2 w-80 h-80 lg:w-96 lg:h-96 pointer-events-none rounded-full"
        style={{
          filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
          objectFit: 'cover'
        }}
      />
      
      <img
        ref={doodleTwoRef}
        src={two.src}
        alt="Doodle decoration"
        className="hidden md:block absolute bottom-2 left-2 w-80 h-80 lg:w-96 lg:h-96 pointer-events-none rounded-full"
        style={{
          filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default Herosection