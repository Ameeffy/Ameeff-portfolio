import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, IconButton, useScrollTrigger, Slide, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Hide header on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About Me', href: '#about', id: 'about' },
  { label: 'Blog', href: '#blog', id: 'blog' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Certifications', href: '#certificates', id: 'certificates' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Header() {
  const [active, setActive] = useState('home');
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Set header background on scroll
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section
      const offset = 120;
      let current = 'home';
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition + offset) {
          current = item.id;
        }
      }
      setActive(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        elevation={0} 
        className={`premium-header ${scrolled ? 'scrolled' : ''}`}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Typography 
              variant="h5" 
              className="premium-logo"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontWeight: 700,
              }}
            >
              <CodeIcon sx={{ mr: 1, fontSize: 32 }} />
              MeeffyTech
            </Typography>
            
            {/* Contact Info (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', mr: 5, alignItems: 'center' }}>
              <Typography variant="caption" className="premium-contact-info">
                {/* <a href="mailto:ameef@example.com" className="contact-item">
                  <EmailIcon fontSize="small" />
                  ameef@example.com
                </a> */}
                <span className="contact-divider">•</span>
                {/* <a href="tel:+639123456789" className="contact-item">
                  <PhoneIcon fontSize="small" />
                  +63 912 345 6789
                </a> */}
              </Typography>
            </Box>
            
            {/* Navigation (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`premium-nav-link ${active === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </Box>
            
            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', alignItems: 'center' }}>
              <IconButton 
                onClick={handleMobileMenuOpen}
                className="premium-menu-button"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
      
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              className="premium-mobile-menu"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.id} onClick={handleMobileMenuClose}>
                  <a 
                    href={item.href}
                    className={`premium-menu-link ${active === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
} 