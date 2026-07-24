import React, { useState } from 'react';
import { Box, Typography, Container, Pagination } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '../assets/certificates.css';

const certificates = [
  {
    id: 1,
    title: 'Introduction to Cyber Security',
    link: 'https://simpli-web.app.link/e/yb5k8UJG6Sb',
  },
  {
    id: 2,
    title: 'Introduction to Data Science',
    link: 'https://simpli-web.app.link/e/esEcIYcG6Sb',
  },
  {
    id: 3,
    title: 'Introduction to Machine Learning with R',
    link: 'https://simpli-web.app.link/e/eYslMJoG6Sb',
  },
  {
    id: 4,
    title: 'Getting Started with Full Stack Java Development',
    link: 'https://simpli-web.app.link/e/P1Li3oGG6Sb',
  },
  {
    id: 5,
    title: 'Python for Beginners',
    link: 'https://simpli-web.app.link/e/eqwHXMEG6Sb',
  },
  {
    id: 6,
    title: 'Introduction to SQL',
    link: 'https://simpli-web.app.link/e/gOEsxCHG6Sb',
  },
  {
    id: 7,
    title: 'ChatGPT for Cybersecurity',
    link: 'https://simpli-web.app.link/e/197CeR4F6Sb',
  },
  {
    id: 8,
    title: 'Introduction to Front End Development',
    link: 'https://simpli-web.app.link/e/Gl39gVNG6Sb',
  },
  {
    id: 9,
    title: 'Introduction to Artificial Intelligence',
    link: 'https://simpli-web.app.link/e/IEeytQPG6Sb',
  },
  {
    id: 10,
    title: 'Introduction to Cloud Security',
    link: 'https://simpli-web.app.link/e/yTFDNgRG6Sb',
  },
  {
    id: 11,
    title: 'Deep Learning for Beginners',
    link: 'https://simpli-web.app.link/e/n6pJSBWG6Sb',
  },
  {
    id: 12,
    title: 'Python Libraries for Data Science',
    link: 'https://simpli-web.app.link/e/TVWVxUXG6Sb',
  },
  {
    id: 13,
    title: 'ReactJS for Beginners',
    link: 'https://simpli-web.app.link/e/Odgly9YG6Sb',
  },
  {
    id: 14,
    title: 'Azure Fundamentals',
    link: 'https://simpli-web.app.link/e/Z1Yxwl0G6Sb',
  },
  {
    id: 15,
    title: 'Artificial Intelligence Beginners Guide',
    link: 'https://simpli-web.app.link/e/TDQpLT1G6Sb',
  },
  {
    id: 16,
    title: 'Introduction to Data Visualization',
    link: 'https://simpli-web.app.link/e/ODTxWY4G6Sb',
  },
  {
    id: 17,
    title: 'Getting Started with Machine Learning Algorithms',
    link: 'https://simpli-web.app.link/e/mfCFlz6G6Sb',
  },
  {
    id: 18,
    title: 'Getting started with NodeJS',
    link: 'https://simpli-web.app.link/e/RzWv3O7G6Sb',
  },
  {
    id: 29,
    title: 'Basics of Data Structures and Algorithms',
    link: 'https://simpli-web.app.link/e/Revtqh9G6Sb',
  },
  {
    id: 20,
    title: 'Advanced Python_',
    link: 'https://simpli-web.app.link/e/MmZRJUaH6Sb',
  },
  {
    id: 21,
    title: 'Introduction to Data Analytics',
    link: 'https://simpli-web.app.link/e/ZNtTP7bH6Sb',
  },
  {
    id: 22,
    title: 'Data Analytics Projects',
    link: 'https://simpli-web.app.link/e/1IynBsdH6Sb',
  },
  {
    id: 23,
    title: 'Introduction to Cryptography for Beginners',
    link: 'https://simpli-web.app.link/e/0fMBRGhH6Sb',
  },
  {
    id: 24,
    title: 'Introduction to Google Cloud Platform',
    link: 'https://simpli-web.app.link/e/NWqbWYiH6Sb',
  },
  {
    id: 25,
    title: 'Introduction to Data Mining Course',
    link: 'https://simpli-web.app.link/e/AfQQD6jH6Sb',
  },
  {
    id: 26,
    title: 'Ethical hacking 101 : Beginners guide to Ethical hacking',
    link: 'https://simpli-web.app.link/e/4wMhW59L6Sb',
  },
  {
    id: 27,
    title: 'AI ML Projects',
    link: 'https://simpli-web.app.link/e/PsH0anjh7Sb',
  },
  {
    id: 28,
    title: 'Introduction to Neural Network',
    link: 'https://simpli-web.app.link/e/t4sc79mh7Sb',
  },
];
const ITEMS_PER_PAGE = 9;

export default function Certificates() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (_, value) => {
    setPage(value);
  };

  const paginatedCertificates = certificates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box component="section" id="certificates" className="certificates-section" ref={ref}>
      <Container maxWidth="xl">
        {/* Section Heading */}
        <Box className="certificates-header">
          <Typography variant="h2" component="h2" className="certificates-title">
            Certificates
          </Typography>
          <Typography className="certificates-subtitle">
            Here are some of my professional certifications and course completions. Each represents a milestone in my continuous learning journey.
          </Typography>
        </Box>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {paginatedCertificates.map((certificate, index) => (
            <Box 
              key={certificate.id}
              className={`certificate-card ${inView ? 'fade-in' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Box className="certificate-header"></Box>
              <Box className="certificate-content">
                <Typography className="certificate-title">{certificate.title}</Typography>
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link"
                >
                  <VerifiedIcon fontSize="small" /> View Certificate
                  <OpenInNewIcon className="certificate-link-icon" fontSize="small" />
                </a>
              </Box>
            </Box>
          ))}
        </div>

        
        <Box display="flex" justifyContent="center" className="pagination-container">
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Box>
      </Container>
    </Box>
  );
}
