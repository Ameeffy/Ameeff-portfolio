import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import '../assets/hero.css';

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const imageRef = useRef(null);
  
  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate distance from center as a percentage (reduced intensity)
      const xPos = (windowWidth / 2 - clientX) / 35;
      const yPos = (windowHeight / 2 - clientY) / 35;
      
      // Apply transform with hardware acceleration
      requestAnimationFrame(() => {
        imageRef.current.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(1.02)`;
      });
    };
    
    // Smoothly reset position when mouse leaves window
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      
      imageRef.current.style.transition = 'transform 0.8s ease-out';
      imageRef.current.style.transform = 'translate3d(0, 0, 0) scale(1.02)';
      
      // Return to faster transition after reset animation completes
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transition = 'transform 0.05s linear';
        }
      }, 800);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <Box component="section" id="home" className="hero-section" ref={ref}>
      <Container>
        <Grid container spacing={6} alignItems="center">

          <Grid item xs={12} md={6}>
            <Box className={`hero-content ${inView ? 'animated' : ''}`}>
              <Box className="hero-subtitle">
                <Box className="hero-line"></Box>
                <Typography className="hero-overline">
                  mobile and Web Developer
                </Typography>
              </Box>
              
              <Typography variant="h2" className="hero-title-secondary">
                Hello, I'm Ar-Ameeff Adjarail
              </Typography>
              
          
              
              <Typography className="hero-description">
              I'm a mobile and web developer passionate about building responsive, user-friendly, and accessible apps with modern technologies.
              </Typography>
              
              <Box className="hero-buttons">
                <Button 
                  variant="contained" 
                  href="#contact"
                  className="hero-button primary"
                >
                  Contact Me
                </Button>
                <Button 
                  variant="outlined" 
                  href="#projects"
                  className="hero-button secondary"
                >
                  View Projects
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Right Column - Image */}
          <Grid item xs={12} md={6}>
            <Box 
              className={`hero-image-container ${inView ? 'animated' : ''}`}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Box 
                className="hero-image-frame"
                sx={{
                  position: 'relative',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(50, 69, 99, 0.2)',
                  overflow: 'hidden',
                  width: '340px',
                  height: '400px',
                  background: 'linear-gradient(135deg, #324563, rgb(180, 50, 50))',
                  padding: '8px'
                }}
              >
                <Box 
                  className="hero-image-wrapper" 
                  ref={imageRef}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#fff',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.05s linear', // Smoother transition
                    transformOrigin: 'center center'
                  }}
                >
                  <Box 
                    component="img"
                    src="/profile.png"
                    alt="Ameef - Frontend Developer"
                    className="hero-image"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block'
                    }}
                    onError={(e) => {
                      console.log('Image failed to load');
                      e.target.onerror = null;
                      e.target.src = '/src/assets/profile.png';
                    }}
                  />
                </Box>
                <Box 
                  className="hero-decorations"
                  sx={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(180, 50, 50, 0.2)',
                    filter: 'blur(30px)'
                  }}
                />
                <Box 
                  className="hero-decorations-2"
                  sx={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(50, 69, 99, 0.15)',
                    filter: 'blur(40px)'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 