import React from 'react';
import Hero from '../components/home/Hero';
import Statistics from '../components/home/Statistics';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Projects from '../components/home/Projects';
import Expertise from '../components/home/Expertise';
import WorkProcess from '../components/home/WorkProcess';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Contact from '../components/home/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Statistics />
      <Services />
      <Projects />
      <Expertise />
      <WorkProcess />
      <About />
      <WhyChooseUs />
      <Contact />
    </div>
  );
}
