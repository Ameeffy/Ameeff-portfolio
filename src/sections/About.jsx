import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider
} from '@mui/material';


import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BrushIcon from '@mui/icons-material/Brush';
import AndroidIcon from '@mui/icons-material/Android';
import GetAppIcon from '@mui/icons-material/GetApp';


import '../assets/about.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  

  return (
    <Box id="about" className="section-about">
      <Container>
 
        <Box className="about-new-header">
          <Typography variant="h2" className="about-new-title">
            About <span className="text-gradient">Me</span>
          </Typography>
          <div className="about-new-underline"></div>
        </Box>

        <Box ref={ref} className={`about-new-container ${inView ? 'fade-in' : ''}`}>
    
          <Box className="about-bio-card">
            <Typography variant="h5" className="bio-heading">
              My Journey
            </Typography>
            
            <Typography variant="body1" className="bio-text">
            I am Ar-Ameeff M. Adjarail, a 22-year-old aspiring full-stack developer from Western Mindanao State University. My passion for programming started at a young age, and it has grown into a deep commitment to building functional, creative, and user-friendly digital solutions. I specialize in both mobile and web development, and I enjoy turning complex problems into elegant code.
            </Typography>
    
            
            <Typography variant="body1" className="bio-text">
            Outside of coding, I enjoy spending quality time with my family and friends, and I find comfort in the companionship of my cats. Whether it's solving a technical challenge or learning a new framework, I’m always eager to grow and improve. My journey in tech is fueled by curiosity, creativity, and the desire to make a difference through technology.
            </Typography>
            
            <Box className="bio-philosophy">
              <Typography variant="subtitle1" className="philosophy-title">
                My Philosophy
              </Typography>
              <Typography variant="body2" className="philosophy-text">
                "I believe that great technology should be both powerful and invisible. My goal is to create digital experiences that not only look beautiful but also solve real problems and bring joy to users."
              </Typography>
            </Box>
            
            <Box className="bio-details">
              <Box className="bio-detail-item">
                <Typography variant="body2" className="bio-detail-label">
                  <CalendarTodayIcon fontSize="small" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Experience 3+ Years
                </Typography>
              </Box>
              
              <Box className="bio-detail-item">
                <Typography variant="body2" className="bio-detail-label">
                  <WorkIcon fontSize="small" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Availability Open to Work
                </Typography>
                
              </Box>
            </Box>         
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 
