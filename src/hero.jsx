import { Box, Typography, Avatar, Stack, IconButton, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #23243a 60%, #2d314d 100%)',
        px: 2,
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
        <Box>
          <Typography variant="h3" fontWeight={700} color="#fff" gutterBottom>
            Hi, I'm Ar-Ameeff M. Adjarail <span style={{ color: '#ff4b6e' }}>❤️</span>
          </Typography>
          <Typography variant="h6" color="#b0b3c6" gutterBottom>
            Mobile and Web Developer
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <IconButton color="primary" href="#" sx={{ bgcolor: '#23243a', color: '#fff' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary" href="#" sx={{ bgcolor: '#23243a', color: '#fff' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton color="primary" href="#" sx={{ bgcolor: '#23243a', color: '#fff' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton color="primary" href="#" sx={{ bgcolor: '#23243a', color: '#fff' }}>
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>
        <Paper elevation={6} sx={{ borderRadius: '24px', p: 2, bgcolor: 'rgba(36,36,60,0.7)' }}>
         
        </Paper>
      </Stack>
    </Box>
  );
} 