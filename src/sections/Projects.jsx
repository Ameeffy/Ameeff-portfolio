import React from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '../assets/projects.css';

const projects = [
  {
    id: 1,
    name: 'Enhancing Payment Transactions in the CCS Department - Web',
    desc: 'A web-based capstone project for secure payment transactions in the College of Computer Studies; Full Stack Developer.',
    image: 'project-img/work0.png',
    tech: ['Node.Js', 'MySql', 'Bootstrap', 'CSS'],
    liveLink: 'https://finalccspayment.onrender.com/',
    githubLink: 'https://github.com/Ameeffy/finalCCSPAYMENT.gita',
  },
  {
    id: 2,
    name: 'Enhancing Payment Transactions in the CCS Department - Mobile',
    desc: 'A mobile app built with React Native and Expo Go, connected to a web backend API; Full Stack Developer.',
    image: 'project-img/work2.jpg',
    tech: ['React Native', 'Expo Go', 'Vector Icons'],
    liveLink: 'https://expo.dev/accounts/ameeffy/projects/ccspayment/builds/7d83470e-f38d-4676-9b12-cb1e644f6da0',
    githubLink: 'https://github.com/Ameeffy/mobileccspayment.gita',
  },
  {
    id: 3,
    name: 'WMSU Dental Clinic Appointment System - Web',
    desc: 'A web-based appointment system for WMSU Dental Clinic using Django; built entire system as the Full Stack Developer.',
    image: 'project-img/work3.png',
    tech: ['Django', 'Bootstrap', 'Chart.js', 'CSS'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/examplea',
  },
  {
    id: 4,
    name: 'Ecommerce goodys Food Platform',
    desc: 'An online food ordering system for meal requests and management; developed entire system as the Full Stack Developer.',
    image: 'project-img/work4.png',
    tech: ['PHP', 'Bootstrap', 'Chart.js', 'MySql'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy/goodysfood.gita',
  },
  {
    id: 5,
    name: 'WMSU Lost and Found App',
    desc: 'A web app for reporting and tracking lost and found items at WMSU; fully developed as the Full Stack Developer.',
    image: 'project-img/work5.png',
    tech: ['Django', 'Bootstrap', 'SqlLite'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy/djangolostandfoundapp.gita',
  },
  {
    id: 6,
    name: 'GrandD Map Navigation',
    desc: 'A map navigation system with step and distance prediction; front-end development, database management.',
    image: 'project-img/work6.png',
    tech: ['Django', 'Machine Learning', 'CSS'],
    liveLink: '/livedemoexpired',
    githubLink: 'https://github.com/Ameeffy/GrandD.gita',
  },
  {
    id: 7,
    name: 'DoItNow Todolist App',
    desc: 'A task management app with full-stack functionality for adding, editing, and deleting tasks; Full Stack Developer.',
    image: 'project-img/sidework1.png',
    tech: ['React', 'CSS', 'Javascript'],
    liveLink: 'https://ameeff-elisan-todolist.netlify.app/',
    githubLink: 'https://github.com/Kobii2214/todolista',
  },
  {
    id: 8,
    name: 'PokeGuide',
    desc: 'A guide for Pokémon enthusiasts, contributed to communication, UI design, and app functionality.',
    image: 'project-img/sidework2.png',
    tech: ['JavaScript', 'OpenWeather API', 'CSS3'],
    liveLink: 'https://pokeguide-elisan-adjarail.netlify.app/',
    githubLink: 'https://github.com/Kobii2214/pokeguidea',
  },
   {
    id: 9,
    name: 'TRAC President Appointment System',
    desc: 'I am creating an ongoing appointment system for the Office of the President of Tawi-Tawi Regional Agricultural College.',
    image: 'project-img/Work7.png',
    tech: ['MYSQL', 'Tailwind CSS', 'Node JS'],
    liveLink: 'Facebook.com',
    githubLink: 'Facebook.com',
  },
];

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box component="section" id="projects" className="projects-section" ref={ref}>
      <Container maxWidth="xl">
        <Box className="projects-header">
          <Typography variant="h2" component="h2" className="projects-title">
            Projects
          </Typography>
          <Typography className="projects-subtitle">
            Here are some of my recent projects. Each one was built with a focus on solving real-world problems with clean, efficient code.
          </Typography>
        </Box>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Box
              key={project.id}
              className={`project-card-small ${inView ? 'fade-in' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.name} className="project-image" />
                <div className="project-overlay"></div>
              </div>
              <Typography className="project-title-small">
                {project.name}
              </Typography>
              <Typography className="project-description-small">
                {project.desc}
              </Typography>
              <Box className="project-tech-small">
                {project.tech.map((item) => (
                  <Chip key={item} label={item} className="project-tech-chip" size="small" />
                ))}
              </Box>
              <Box className="project-links-small">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link-small">
                  <GitHubIcon fontSize="small" /> GitHub
                </a>
                {project.liveLink.startsWith('/') ? (
                  <a href={project.liveLink} className="project-link-small">
                    <OpenInNewIcon fontSize="small" /> Live Demo
                  </a>
                ) : (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link-small">
                    <OpenInNewIcon fontSize="small" /> Live Demo
                  </a>
                )}
              </Box>
            </Box>
          ))}
        </div>
      </Container>
    </Box>
  );
}
