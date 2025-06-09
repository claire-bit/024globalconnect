import React from 'react';
import Header from '../components/Header'
import Hero from '../components/Hero'
import MissionVision from '../components/MissionVision'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import RegistrationForm from '../components/RegistrationForm';
import ContactForm  from '../components/ContactForm';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <MissionVision />
      <CTA />
      <Footer />
      <RegistrationForm />
      <ContactForm />
    </>
  );
};

export default Home;
