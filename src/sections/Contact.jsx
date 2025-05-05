import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Alert, CircularProgress, Snackbar } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InstagramIcon from '@mui/icons-material/Instagram';
import '../assets/premium-contact.css';

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setSnackbarOpen(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="section" id="contact" className="contact-section" ref={ref}>
      <Container>
        {/* Section Heading */}
        <Box className={`contact-header ${inView ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
          <Typography variant="h2" component="h2" className="contact-title">
            Get In Touch
          </Typography>
          <Typography className="contact-subtitle">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </Typography>
        </Box>
        
        {/* Contact Content */}
        <Box className="contact-container">
          {/* Contact Info */}
          <Box className={`contact-info ${inView ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <Box className="contact-info-card">
              <Typography className="contact-text">
                I'm currently available for freelance work and open to new opportunities. 
                If you have a project that you want to get started or need help with 
                something, feel free to get in touch with me.
              </Typography>
              
              <Box className="contact-methods">
                <Box className="contact-method">
                  <Box className="contact-icon">
                    <EmailIcon />
                  </Box>
                  <Box className="contact-detail">
                    <Typography className="contact-label">Email</Typography>
                    <Typography className="contact-value">
                      <a href="mailto:ameef@example.com" className="contact-link">ameef@example.com</a>
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="contact-method">
                  <Box className="contact-icon">
                    <PhoneIcon />
                  </Box>
                  <Box className="contact-detail">
                    <Typography className="contact-label">Phone</Typography>
                    <Typography className="contact-value">
                      <a href="tel:+639123456789" className="contact-link">+63 912 345 6789</a>
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="contact-method">
                  <Box className="contact-icon">
                    <LocationOnIcon />
                  </Box>
                  <Box className="contact-detail">
                    <Typography className="contact-label">Location</Typography>
                    <Typography className="contact-value">Manila, Philippines</Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box className="social-links">
                <a href="https://www.facebook.com/Ameeffy" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </a>
                <a href="https://x.com/Meeffmeeff?s=21" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </a>
                <a href="https://www.linkedin.com/in/ameeffy-adjarail-889477363/" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </a>
                <a href="https://www.instagram.com/ameeffy" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
              </Box>
            </Box>
          </Box>
          
          {/* Contact Form */}
          <Box className={`contact-form-container ${inView ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
            {submitSuccess ? (
              <Box className="success-message">
                <CheckCircleIcon className="success-icon" />
                <Typography className="success-title">Message Sent!</Typography>
                <Typography className="success-text">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </Typography>
              </Box>
            ) : (
              <>
                <Typography className="form-title">Send Message</Typography>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <Box className="form-field">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name" 
                      className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </Box>
                  
                  <Box className="form-field">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email" 
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </Box>
                  
                  <Box className="form-field">
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject" 
                      className="form-input"
                    />
                  </Box>
                  
                  <Box className="form-field">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message" 
                      className={`form-input ${errors.message ? 'form-input-error' : ''}`}
                    ></textarea>
                    {errors.message && <div className="form-error">{errors.message}</div>}
                  </Box>
                  
                  <button 
                    type="submit" 
                    className="submit-button" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          elevation={6}
          variant="filled"
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 