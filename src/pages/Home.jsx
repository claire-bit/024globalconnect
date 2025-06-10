// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MissionVision from '../components/MissionVision';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <MissionVision />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
