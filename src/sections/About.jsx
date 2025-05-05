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

// Import icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BrushIcon from '@mui/icons-material/Brush';
import AndroidIcon from '@mui/icons-material/Android';
import GetAppIcon from '@mui/icons-material/GetApp';

// Import CSS
import '../assets/premium-about.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Areas of expertise data
  const expertiseAreas = [
    {
      id: 1,
      icon: <CodeIcon fontSize="large" />,
      title: "Frontend Development",
      skills: ["React", "Next.js", "Vue.js", "JavaScript", "TypeScript", "HTML5/CSS3"]
    },
    {
      id: 2,
      icon: <StorageIcon fontSize="large" />,
      title: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"]
    },
    {
      id: 3,
      icon: <DesignServicesIcon fontSize="large" />,
      title: "UI/UX Design",
      skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"]
    },
    {
      id: 4,
      icon: <CloudIcon fontSize="large" />,
      title: "DevOps & Cloud",
      skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Serverless"]
    },
    {
      id: 5,
      icon: <BrushIcon fontSize="large" />,
      title: "Creative Development",
      skills: ["GSAP", "Three.js", "Canvas", "SVG Animation", "WebGL"]
    },
    {
      id: 6,
      icon: <AndroidIcon fontSize="large" />,
      title: "Mobile Development",
      skills: ["React Native", "Flutter", "Progressive Web Apps", "Responsive Design"]
    }
  ];

  return (
    <Box id="about" className="section-about">
      <Container>
        {/* Section Header */}
        <Box className="about-new-header">
          <Typography variant="h2" className="about-new-title">
            About <span className="text-gradient">Me</span>
          </Typography>
          <div className="about-new-underline"></div>
        </Box>

        {/* Main Content Container */}
        <Box ref={ref} className={`about-new-container ${inView ? 'fade-in' : ''}`}>
          {/* Bio Card */}
          <Box className="about-bio-card">
            <Typography variant="h5" className="bio-heading">
              My Journey
            </Typography>
            
            <Typography variant="body1" className="bio-text">
              I am a passionate full-stack developer with over 5 years of experience crafting digital experiences that make a difference. My journey began with a fascination for how technology can solve real-world problems, which led me to pursue formal education in Computer Science.
            </Typography>
            
            <Typography variant="body1" className="bio-text">
              I've since worked with startups, agencies, and enterprise clients to build everything from responsive web applications to complex software solutions. My approach combines technical expertise with creative problem-solving, always keeping the end-user in mind.
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
                  Experience
                </Typography>
                <Typography variant="body2" className="bio-detail-value">
                  5+ Years
                </Typography>
              </Box>
              
              <Box className="bio-detail-item">
                <Typography variant="body2" className="bio-detail-label">
                  <WorkIcon fontSize="small" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Availability
                </Typography>
                <Typography variant="body2" className="bio-detail-value">
                  Open to Work
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="contained"
              className="about-resume-button"
              endIcon={<GetAppIcon />}
              href="/resume.pdf"
              target="_blank"
            >
              Download Resume
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 