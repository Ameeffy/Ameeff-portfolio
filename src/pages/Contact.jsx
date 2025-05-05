import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

export default function Contact() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 3 }}>
      <Typography variant="h3" fontWeight={700} color="white" align="center" gutterBottom>
        Contact
      </Typography>
      <Typography variant="h6" color="#b0b3c6" align="center" sx={{ maxWidth: 500 }}>
        Want to work together or have a question? Send me a message!
      </Typography>
      <Box component="form" sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
        <Stack spacing={2}>
          <TextField label="Name" variant="outlined" fullWidth InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#b0b3c6' } }} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
          <TextField label="Email" variant="outlined" fullWidth InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#b0b3c6' } }} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
          <TextField label="Message" variant="outlined" fullWidth multiline rows={4} InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#b0b3c6' } }} sx={{ bgcolor: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
          <Button variant="contained" sx={{ bgcolor: '#90caf9', color: '#232526', fontWeight: 700, borderRadius: 2 }} fullWidth>
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
} 