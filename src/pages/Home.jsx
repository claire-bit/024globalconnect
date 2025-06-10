// src/pages/Home.jsx
import React from 'react';
import Header from '../components/login/Header';
import Hero from '../components/login/Hero';
import MissionVision from '../components/login/MissionVision';
import CTA from '../components/login/CTA';
import Footer from '../components/login/Footer';

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
