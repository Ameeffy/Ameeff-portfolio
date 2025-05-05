import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import '../assets/premium-skills.css';


const skills = [
  {
    category: "Frontend Engineering",
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 85 },
      { name: "Material UI", level: 75 }
    ]
  },
  {
    category: "Backend developemnt",
    items: [
      { name: "Node.js", level: 70 },
      { name: "Django", level: 65 },
      { name: "PHP", level: 60 },
    ]
  },
  {
    category: "Software Development Tools",
    items: [
      { name: "Expo Go App", level: 90 },
      { name: "Git", level: 90 },
      { name: "Figma", level: 65 },
      { name: "VS Code", level: 90 },
      
    ]
  },
  {
    category: "Mobile Development",
    items: [
      { name: "React Native", level: 90 },
      { name: "Mobile UI Design", level: 85 },
      { name: "iOS Development", level: 60 },
      { name: "Android Development", level: 55 }
      
    ]
  }
];

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Box component="section" id="skills" className="skills-section" ref={ref}>
      <Container>
     
        <Box className="skills-header">
          <Typography variant="h2" component="h2" className="skills-title">
            Skills
          </Typography>
          <Typography 
            className="skills-subtitle" 
            sx={{ textAlign: 'center', maxWidth: '700px', mx: 'auto' }}
          >
            My technical expertise spans multiple domains from frontend to DevOps with a focus on creating exceptional user experiences
          </Typography>
        </Box>


        <Grid container spacing={4} className="skills-container">
          {skills.map((category, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6}
              md={6} 
              lg={4}
              key={category.category}
              className="skill-category-container"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Box className={`skill-category ${inView ? 'fade-in' : ''}`}>
                <Box className="skill-category-header">
                  <Typography className="skill-category-title">
                    {category.category}
                  </Typography>
                </Box>
              
                <Box className="skill-list">
                  {category.items.map((skill) => (
                    <Box className="skill-item" key={skill.name}>
                      <Box className="skill-info">
                        <Typography className="skill-name">{skill.name}</Typography>
                        <Typography className="skill-percentage">{skill.level}%</Typography>
                      </Box>
                      <Box className="skill-bar-bg">
                        <Box 
                          className="skill-bar-fill" 
                          style={{ width: `${skill.level}%` }}
                        ></Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 
