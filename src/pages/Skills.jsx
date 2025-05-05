import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WebIcon from '@mui/icons-material/Web';

const skills = [
  { label: 'React', icon: <CodeIcon /> },
  { label: 'JavaScript', icon: <CodeIcon /> },
  { label: 'HTML5', icon: <WebIcon /> },
  { label: 'CSS3', icon: <WebIcon /> },
  { label: 'Node.js', icon: <CodeIcon /> },
  { label: 'MongoDB', icon: <StorageIcon /> },
  { label: 'Firebase', icon: <StorageIcon /> },
  { label: 'Flutter', icon: <PhoneIphoneIcon /> },
  { label: 'Dart', icon: <PhoneIphoneIcon /> },
  { label: 'MySQL', icon: <StorageIcon /> },
];

export default function Skills() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 4 }}>
      <Typography variant="h3" fontWeight={700} color="white" align="center" gutterBottom>
        Skills
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
        {skills.map((skill) => (
          <Chip
            key={skill.label}
            icon={skill.icon}
            label={skill.label}
            sx={{ fontSize: '1.1rem', fontWeight: 600, px: 2, py: 1, bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: 2 }}
          />
        ))}
      </Stack>
    </Box>
  );
} 