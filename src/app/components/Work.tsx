'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import one from "../../../public/images/work/one.jpg";
import two from "../../../public/images/work/two.jpg";
import three from "../../../public/images/work/three.jpg";
import four from "../../../public/images/work/four.jpg";
import five from "../../../public/images/work/five.jpg";
import six from "../../../public/images/work/six.jpg";
import seven from "../../../public/images/work/seven.jpg";
import eight from "../../../public/images/work/eight.jpg";
import nine from "../../../public/images/work/nine.jpg";
import ten from "../../../public/images/work/ten.jpg";
import eleven from "../../../public/images/work/eleven.jpg";
import twelve from "../../../public/images/work/twelve.jpg";
import thirteen from "../../../public/images/work/thirteen.jpg";
import fourteen from "../../../public/images/work/fourteen.jpg";
import fifteen from "../../../public/images/work/fifveteen.jpg";
import sixteen from "../../../public/images/work/sixteen.jpg";
import seventeen from "../../../public/images/work/seventeen.jpg";
import eighteen from "../../../public/images/work/eighteen.jpg";
import nineteen from "../../../public/images/work/nineteen.jpg";
import twenty from "../../../public/images/work/twenty.png";
gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const workRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)

  const workImages = [
    { src: one, alt: "Project 1" },
    { src: two, alt: "Project 2" },
    { src: three, alt: "Project 3" },
    { src: four, alt: "Project 4" },
    { src: five, alt: "Project 5" },
    { src: six, alt: "Project 6" },
    { src: seven, alt: "Project 7" },
    { src: eight, alt: "Project 8" },
    { src: nine, alt: "Project 9" },
    { src: ten, alt: "Project 10" },
    { src: eleven, alt: "Project 11" },
    { src: twelve, alt: "Project 12" },
    { src: thirteen, alt: "Project 13" },
    { src: fourteen, alt: "Project 14" },
    { src: fifteen, alt: "Project 15" },
    { src: sixteen, alt: "Project 16" },
    { src: seventeen, alt: "Project 17" },
    { src: eighteen, alt: "Project 18" },
    { src: nineteen, alt: "Project 19" },
    { src: twenty, alt: "Project 20" }
  ];

  // Calculate exact grid positions to eliminate gaps
  const calculateGridPositions = useCallback((expandedIndex: number | null) => {
    const totalItems = workImages.length
    const positions: Array<{gridColumn: string, gridRow: string, gridColumnStart?: string, gridRowStart?: string}> = []
    
    if (expandedIndex === null) {
      // Normal grid - all items are 1x1
      for (let i = 0; i < totalItems; i++) {
        positions.push({
          gridColumn: 'span 1',
          gridRow: 'span 1'
        })
      }
    } else {
      // Different sizes for mobile vs desktop
      for (let i = 0; i < totalItems; i++) {
        if (i === expandedIndex) {
          // Check if we're on mobile (4 columns) or desktop (5 columns)
          const isMobile = window.innerWidth < 768
          positions.push({
            gridColumn: isMobile ? 'span 4' : 'span 3', // 4 columns on mobile, 3 on desktop
            gridRow: isMobile ? 'span 3' : 'span 2'      // 3 rows on mobile, 2 on desktop
          })
        } else {
          positions.push({
            gridColumn: 'span 1',
            gridRow: 'span 1'
          })
        }
      }
    }
    
    return positions
  }, [workImages.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current], { 
        opacity: 0, 
        y: 50 
      })
      
      gsap.set(".work-item", {
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

      // Staggered animation for work items
      gsap.to(".work-item", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Optimized hover animations for work items
      document.querySelectorAll('.work-item').forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          })
        })
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          })
        })
      })

    }, workRef)

    return () => ctx.revert()
  }, [])

  // Handle card expansion with dynamic positioning
  useEffect(() => {
    if (expandedIndex !== null) {
      const positions = calculateGridPositions(expandedIndex)
      
      // Apply positions to all cards
      document.querySelectorAll('.work-item').forEach((card, index) => {
        const element = card as HTMLElement
        const position = positions[index]
        
        // Apply exact grid positioning
        gsap.set(element, {
          gridColumn: position.gridColumn,
          gridRow: position.gridRow,
          gridColumnStart: position.gridColumnStart,
          gridRowStart: position.gridRowStart
        })
        
        // Animate scale only (keep original colors)
        if (index !== expandedIndex) {
          gsap.to(element, {
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
    } else {
      // Reset all cards
      document.querySelectorAll('.work-item').forEach((card) => {
        const element = card as HTMLElement
        
        gsap.to(element, {
          gridColumn: 'span 1',
          gridRow: 'span 1',
          gridColumnStart: 'auto',
          gridRowStart: 'auto',
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    }
  }, [expandedIndex, calculateGridPositions])

  const handleCardClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null) // Close if same card clicked
    } else {
      setExpandedIndex(index) // Expand new card
    }
  }

  return (
    <>
      <style jsx>{`
        .work-item {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        @media (max-width: 767px) {
          .work-item {
            overflow: hidden !important;
            border-radius: 20px !important;
          }
          .work-item img {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            border-radius: 17px !important;
            clip-path: inset(0 round 17px) !important;
          }
        }
      `}</style>
      <div 
        ref={workRef}
        data-section="work"
        className="work-section relative min-h-screen py-20 px-8 bg-white"
      >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-black mb-16 text-center"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          My <span style={{ color: '#f99e1c' }}>Work</span>
        </h2>
        
        <div 
          ref={gridRef}
          className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
        >
          {workImages.map((image, index) => (
            <div
              key={index}
              data-index={index}
              className="work-item relative group cursor-pointer"
              onClick={() => handleCardClick(index)}
              style={{
                aspectRatio: expandedIndex === index ? (window.innerWidth < 768 ? '4/3' : '3/2') : '1/1',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '3px solid #000',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.5s ease',
                position: 'relative',
                contain: 'layout style paint'
              }}
            >
              <img
                src={image.src.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  borderRadius: '17px',
                  width: '100%',
                  height: '100%'
                }}
              />
              
              {/* Overlay on hover */}
              <div 
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"
                style={{
                  backgroundColor: expandedIndex === index ? 'rgba(249, 158, 28, 0.2)' : 'rgba(249, 158, 28, 0.1)'
                }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="px-4 py-2 rounded-full text-black font-bold"
                    style={{
                      backgroundColor: '#f99e1c',
                      border: '2px solid #000'
                    }}
                  >
                    {expandedIndex === index ? 'Close' : 'View Project'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Work