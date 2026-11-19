import React, { useEffect } from 'react';
import About from '../components/home/About';
import Statistics from '../components/home/Statistics';
import Expertise from '../components/home/Expertise';
import WhyChooseUs from '../components/home/WhyChooseUs';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <About />
      <Statistics />
      <Expertise />
      <WhyChooseUs />
    </div>
  );
}
