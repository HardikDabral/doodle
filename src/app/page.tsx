'use client'
import Herosection from "./components/Herosection";
import AboutUs from "./components/AboutUs";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skills from "./components/Skills";
import Work from "./components/Work";
import ContactUs from "./components/ContactUs";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize ScrollTrigger after components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="smooth-scroll">
      <Herosection />
      <AboutUs />
      <Work />
      <Skills />
      <ContactUs />
    </div>
  );
}
