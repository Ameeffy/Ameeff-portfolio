import React, { useEffect } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Blog from './sections/Blog';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';

import BlogDetail from './pages/BlogDetail';
import LiveDemoExpired from './sections/LiveDemoExpired';

import './premium-ui.css';

const Home = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Header />
      <Box className="premium-content">
        <div className="premium-gradient-bg"></div>
        <div className="premium-pattern-overlay"></div>
        <Container maxWidth="lg" className="premium-container">
          <Hero />
          <div className="premium-section-divider"></div>
          <About />
          <div className="premium-section-divider"></div>
          <Blog />
          <div className="premium-section-divider"></div>
          <Education />
          <div className="premium-section-divider"></div>
          <Skills />
          <div className="premium-section-divider"></div>
          <Projects />
          <div className="premium-section-divider"></div>
          <Certificates />
          <div className="premium-section-divider"></div>
          <Contact />
        </Container>
      </Box>
    </>
  );
};

function App() {
  return (
    <div className="premium-app">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/livedemoexpired" element={<LiveDemoExpired />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
