import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
      <Typography variant="h2" fontWeight={800} color="white" align="center" gutterBottom>
        Ar-Ameeff M. Adjarail <span style={{ color: '#e53935' }}>❤️</span>
      </Typography>
      <Typography variant="h5" color="#b0b3c6" align="center" gutterBottom>
       
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <IconButton color="primary" href="#" size="large"><FacebookIcon /></IconButton>
        <IconButton color="primary" href="#" size="large"><InstagramIcon /></IconButton>
        <IconButton color="primary" href="#" size="large"><LinkedInIcon /></IconButton>
        <IconButton color="primary" href="#" size="large"><TwitterIcon /></IconButton>
      </Stack>
    </Box>
  );
} 