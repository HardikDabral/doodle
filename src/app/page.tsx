'use client'
import Herosection from "./components/Herosection";
import AboutUs from "./components/AboutUs";
import Skills from "./components/Skills";
import Work from "./components/Work";
import ContactUs from "./components/ContactUs";

export default function Home() {
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
