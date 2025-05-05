import React from 'react';
import { Box, Typography } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 2 }}>
      <Typography variant="h3" fontWeight={700} color="white" align="center" gutterBottom>
        About Me
      </Typography>
      <Typography variant="h6" color="#b0b3c6" align="center" sx={{ maxWidth: 600 }}>
        I am Ar-Ameeff M. Adjarail, a passionate Mobile and Web Developer with a strong background in hybrid app development, database management, and modern web technologies. I love building elegant, user-focused digital experiences.
      </Typography>
    </Box>
  );
} 