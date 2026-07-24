import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function LiveDemoExpired() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.history.back();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Live demo is not available.
      </Typography>
      <Typography variant="body1">
        Redirecting back in {countdown} second{countdown !== 1 && 's'}...
      </Typography>
    </Container>
  );
}
