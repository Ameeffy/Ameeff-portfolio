import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';

const projects = [
  {
    name: 'Portfolio Website',
    desc: 'A modern, minimal portfolio built with React and Vite.',
    link: '#',
  },
  {
    name: 'Mobile App',
    desc: 'A cross-platform mobile app using Flutter and Firebase.',
    link: '#',
  },
  {
    name: 'Blog Platform',
    desc: 'A full-stack blog platform with Node.js and MongoDB.',
    link: '#',
  },
];

export default function Projects() {
  return (
    <Box>
      <Typography variant="h3" fontWeight={700} color="white" align="center" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.name}>
            <Card sx={{ background: 'rgba(255,255,255,0.02)', boxShadow: 'none', borderRadius: 3, border: '1px solid rgba(255,255,255,0.08)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#90caf9">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="#b0b3c6" sx={{ minHeight: 48 }}>
                  {project.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={project.link} target="_blank" sx={{ color: '#90caf9', fontWeight: 600 }}>
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 