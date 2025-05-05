import React from 'react';
import { Box, Container, Typography, Card } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import '../assets/premium-education.css';

const Education = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const educationData = [
    {
      id: 1,
      school: "Western Mindanao State University",
      degree: "BS in Information Technology • 2021 – Present",
      description: "Mobile and Web hybrid development and database management",
      logo: "/wmsu.png"
    },
    {
      id: 2,
      school: "Filipino Turkish Tolerance School",
      degree: "Junior & Senior High School – HUMSS Strand • 2015 – 2021",
      description: "95% with High Honor | Athletic Award",
      logo: "/turkish-school.jpg"
    },
    {
      id: 3,
      school: "Bongao Adventist Elementary School",
      degree: "Elementary • 2012 – 2015",
      description: "Silver Medalist | Excellence Award, Best in Math",
      logo: "/adventist.png"
    },
    {
      id: 4,
      school: "Notre Dame of Bongao",
      degree: "Kindergarten & Elementary • 2008 – 2012",
      description: "Top 3 Student in class",
      logo: "/notre-dame.jpg"
    }
  ];

  return (
    <Box 
      component="section" 
      id="education" 
      className="education-section"
      ref={ref}
    >
      <Container>
        {/* Section Heading */}
        <Box className="education-header">
          <Typography variant="h2" component="h2" className="education-title">
            Education
          </Typography>
          <Typography 
            className="education-subtitle"
            sx={{ 
              position: 'relative',
              zIndex: 2,
              marginBottom: '50px !important',
              marginTop: '30px !important',
              maxWidth: '800px',
              padding: '0 20px'
            }}
          >
            My academic journey through various institutions that shaped my knowledge and expertise
          </Typography>
        </Box>

        {/* Education Cards */}
        <Box className="education-cards">
          {educationData.map((item, index) => (
            <Card 
              key={item.id}
              className={`education-card ${inView ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Box className="education-logo-container">
                <img 
                  src={item.logo} 
                  alt={item.school} 
                  className="education-logo"
                />
              </Box>
              <Box className="education-content">
                <Typography className="education-school-name">
                  {item.school}
                </Typography>
                <Typography className="education-degree">
                  {item.degree}
                </Typography>
                <Typography className="education-description">
                  {item.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education; 