import { Box, Typography, Card, CardContent, Avatar, Stack } from '@mui/material';

const educationData = [
  {
    school: 'Western Mindanao State University',
    degree: 'BS in Information Technology • 2021 – Present',
    details: 'Mobile and Web hybrid development and database management',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Western_Mindanao_State_University_seal.png',
  },
  {
    school: 'Filipino Turkish Tolerance School',
    degree: 'Junior & Senior High School – HUMSS Strand • 2015 – 2021',
    details: '95% with High Honor | Athletic Award',
    logo: 'https://i.ibb.co/6bQwQ7d/ftts-logo.png', // Placeholder
  },
  {
    school: 'Bongao Adventist Elementary School',
    degree: 'Elementary • 2012 – 2015',
    details: 'Silver Medalist | Excellence Award, Best in Math',
    logo: 'https://i.ibb.co/6r6n6wF/adventist-logo.png', // Placeholder
  },
  {
    school: 'Notre Dame of Bongao',
    degree: 'Kindergarten & Elementary • 2008 – 2012',
    details: 'Top 3 Student in class',
    logo: 'https://i.ibb.co/6bQwQ7d/ndb-logo.png', // Placeholder
  },
];

export default function Education() {
  return (
    <Box sx={{ py: 8, background: 'linear-gradient(135deg, #23243a 60%, #2d314d 100%)' }}>
      <Typography variant="h4" align="center" color="#fff" fontWeight={700} mb={4}>
        Education
      </Typography>
      <Stack spacing={4} alignItems="center">
        {educationData.map((edu, idx) => (
          <Card
            key={edu.school}
            sx={{
              width: { xs: '90%', md: '60%' },
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'rgba(36,36,60,0.85)',
              boxShadow: 6,
              borderRadius: 4,
              px: 2,
            }}
          >
            <Avatar src={edu.logo} alt={edu.school} sx={{ width: 72, height: 72, mr: 3, bgcolor: '#fff' }} />
            <CardContent>
              <Typography variant="h6" color="#fff" fontWeight={600}>
                {edu.school}
              </Typography>
              <Typography variant="subtitle2" color="#b0b3c6">
                {edu.degree}
              </Typography>
              <Typography variant="body2" color="#b0b3c6">
                {edu.details}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
} 