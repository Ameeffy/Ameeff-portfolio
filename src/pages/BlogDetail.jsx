import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Divider, 
  Button,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import '../assets/blog-detail.css';


import { blogData } from '../data/blogData';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [prevBlog, setPrevBlog] = useState(null);
  
  useEffect(() => {
    const blogId = parseInt(id);
    const currentBlog = blogData.find(blog => blog.day === blogId);
    
    if (currentBlog) {
      setBlog(currentBlog);
      

      const nextBlogPost = blogData.find(blog => blog.day === blogId + 1);
      const prevBlogPost = blogData.find(blog => blog.day === blogId - 1);
      
      setNextBlog(nextBlogPost || null);
      setPrevBlog(prevBlogPost || null);
      

      window.scrollTo(0, 0);
    }
  }, [id]);
  
  if (!blog) {
    return (
      <>
        
        <Box className="blog-detail-loading">
          <Container>
            <Typography variant="h4">Loading...</Typography>
          </Container>
        </Box>
      </>
    );
  }
  
  return (
    <>
      
      <Box className="blog-detail-container">

        <Box className="blog-detail-header">
          <Container>
            <Box className="blog-detail-nav">
              <Button 
                component={Link} 
                to="/#blog" 
                className="blog-back-button"
                startIcon={<ArrowBackIcon />}
              >
                Home
              </Button>
            </Box>
            
            <Box className="blog-detail-title-container">
              <Typography variant="overline" className="blog-detail-day">
                {blog.sheesh}
              </Typography>
              <Typography variant="h1" className="blog-detail-title">
                {blog.title}
              </Typography>
              <Typography variant="subtitle1" className="blog-detail-title">
                {blog.summary}
              </Typography>
            </Box>
          </Container>
        </Box>
        

        <Box className="blog-detail-hero-container">
          <Container>
            <Box className="blog-detail-hero-image-container">
              <Box
                component="img"
                src={blog.coverImage}
                alt={blog.title}
                className="blog-detail-hero-image"
              />
            </Box>
          </Container>
        </Box>
        

        <Box className="blog-detail-content">
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Box className="blog-detail-article">
                  <Typography variant="body1" className="blog-detail-text">
                    {blog.content}
                  </Typography>
                  
                
                  <br />
                  <br />
                  <Typography variant="h4" className="blog-detail-subheading">
                    Photo Gallery
                  </Typography>
                  
                  <Box className="blog-detail-photo-grid">
                    {blog.images.map((image, index) => (
                      <Box key={index} className="blog-detail-gallery-item">
                        <Box
                          component="img"
                          src={image.src}
                          alt={image.alt}
                          className="blog-detail-gallery-image"
                        />
                        
                      </Box>
                    ))}
                  </Box>
                </Box>
                
              
                <Box className="blog-detail-navigation">
                  <Divider className="blog-detail-divider" />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {prevBlog && (
                        <Button
                          component={Link}
                          to={`/blog/${prevBlog.day}`}
                          className="blog-nav-button prev"
                          startIcon={<ChevronLeftIcon />}
                        >
                          <Box className="blog-nav-content">
                            <Typography variant="caption" className="blog-nav-label">
                              Previous Post
                            </Typography>
                            <Typography variant="body2" className="blog-nav-title">
                              {prevBlog.title}
                            </Typography>
                          </Box>
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      {nextBlog && (
                        <Button
                          component={Link}
                          to={`/blog/${nextBlog.day}`}
                          className="blog-nav-button next"
                          endIcon={<ChevronRightIcon />}
                        >
                          <Box className="blog-nav-content">
                            <Typography variant="caption" className="blog-nav-label">
                              Next Post
                            </Typography>
                            <Typography variant="body2" className="blog-nav-title">
                              {nextBlog.title}
                            </Typography>
                          </Box>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              
        
              <Grid item xs={12} md={4}>
                <Box className="blog-detail-sidebar">
                  <Box className="blog-sidebar-section">
                    <Typography variant="h6" className="blog-sidebar-heading">
                      Navigations
                    </Typography>
                    <Box className="blog-sidebar-posts">
                      {blogData
                        .filter(post => post.day !== blog.day)
                        .slice(0, 9)
                        .map((post) => (
                          <Box 
                            key={post.day} 
                            component={Link} 
                            to={`/blog/${post.day}`}
                            className="blog-sidebar-post-link"
                          >
                            <Box className="blog-sidebar-post">
                              <Box
                                component="img"
                                src={post.coverImage}
                                alt={post.title}
                                className="blog-sidebar-post-image"
                              />
                              <Box className="blog-sidebar-post-content">
                                <Typography variant="caption" className="blog-sidebar-post-day">
                                  Day {post.day}
                                </Typography>
                                <Typography variant="body2" className="blog-sidebar-post-title">
                                  {post.title}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default BlogDetail; 
