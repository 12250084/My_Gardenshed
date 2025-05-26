import React from 'react';
import { Box, Container, Typography, Divider, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import { motion } from 'framer-motion';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box sx={{ mt: 0 }}>
        {/* Hero Banner with animated text and gradient overlay */}
        <Box
            sx={{
              width: '100%',
              height: { xs: '80vh', md: '90vh' },
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://www.theshedstore.com/wp-content/uploads/2022/08/the-shed-store-gallery-11-1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: isMobile ? 'scroll' : 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
        >
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: isMobile ? '1.5rem' : '2.5rem',
                marginLeft: isMobile ? 0 : '5rem',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.1)',
                maxWidth: isMobile ? '90%' : '50%'
              }}
          >
            <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="bold"
                sx={{
                  lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
            >
              Premium Thermofoil Sheds
            </Typography>
            <Typography
                variant={isMobile ? "body1" : "h5"}
                sx={{
                  mt: 2,
                  mb: 3,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
            >
              Built Strong, Styled Smart — Explore Our Durable Range Today
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                size={isMobile ? "medium" : "large"}
                sx={{
                  mt: 1,
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
            >
              Discover More
            </Button>
          </motion.div>
        </Box>

        {/* Trusted Brands Section with hover effects */}
        <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
          <Container>
            <Typography
                variant="h5"
                textAlign="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.secondary,
                  mb: 4
                }}
            >
              Trusted Brands We Partner With
            </Typography>
            <Grid container justifyContent="center" spacing={4} alignItems="center">
              {[
                { src: "https://lirp.cdn-website.com/79699403/dms3rep/multi/opt/colorbond-640w.png", alt: "Colorbond" },
                { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv7i0Aj-pA1OoKGwf-HMvoDYOdNhK6k2DGhQ&s", alt: "BlueScope" },
                { src: "https://www.stratco.co.nz/static/gfx/logo/stratco-og.jpg", alt: "Stratco" },
                { src: "https://1000logos.net/wp-content/uploads/2024/10/Bunnings-Logo-1991.jpg", alt: "Bunnings" }
              ].map((brand, index) => (
                  <Grid item key={index}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <img
                          src={brand.src}
                          alt={brand.alt}
                          style={{
                            height: isMobile ? 40 : 60,
                            filter: 'grayscale(30%)',
                            opacity: 0.8,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              filter: 'grayscale(0%)',
                              opacity: 1
                            }
                          }}
                      />
                    </motion.div>
                  </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container sx={{ py: 6 }}>
          {/* CTA Banner with animation */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
          >
            <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 3,
                  mb: 6,
                  textAlign: 'center',
                  boxShadow: theme.shadows[4],
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                }}
            >
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
                Custom-Built Sheds Tailored to Your Needs
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"} sx={{ mt: 2, mb: 3 }}>
                Explore our full range or design your perfect shed with our intuitive custom builder tool.
              </Typography>
              <Button
                  variant="contained"
                  color="secondary"
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    fontWeight: 'bold',
                    px: 4,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
              >
                Start Building Now
              </Button>
            </Box>
          </motion.div>

          {/* Category Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  mb: 4,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    display: 'block',
                    width: '80px',
                    height: '4px',
                    background: theme.palette.secondary.main,
                    margin: '0.5rem auto 0',
                    borderRadius: '2px'
                  }
                }}
            >
              Shop by Category
            </Typography>
            <CategoryList />
          </Box>

          <Divider
              sx={{
                my: 8,
                borderColor: 'divider',
                borderWidth: '1px',
                opacity: 0.5
              }}
          />

          <BannerProduct />

          <Divider
              sx={{
                my: 8,
                borderColor: 'divider',
                borderWidth: '1px',
                opacity: 0.5
              }}
          />

          {/* Featured Products */}
          <Box sx={{ mb: 8 }}>
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  mb: 6,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    display: 'block',
                    width: '80px',
                    height: '4px',
                    background: theme.palette.secondary.main,
                    margin: '0.5rem auto 0',
                    borderRadius: '2px'
                  }
                }}
            >
              Explore Our Premium Range
            </Typography>

            <Box display={'flex'} flexDirection={'column'} container spacing={4}>
              {[
                { category: "garden-sheds", heading: "Garden Sheds" },
                { category: "workshop-sheds", heading: "Workshop Sheds" },
                { category: "garage-sheds", heading: "Garage Sheds" },
                { category: "storage-units", heading: "Storage Units" },
                { category: "aviaries-pet-shelters", heading: "Aviaries & Pet Shelters" },
                { category: "roofing-sheets", heading: "Roofing Sheets" },
                { category: "mcfoil-insulation", heading: "Foil Insulation (MCFOIL)" },
                { category: "custom-sheds", heading: "Custom Shed Builder" }
              ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                      <VerticalCardProduct
                          category={item.category}
                          heading={item.heading}
                      />
                    </motion.div>
                  </Grid>
              ))}
            </Box>
          </Box>

          {/* Info Section with gradient background */}
          <Box
              sx={{
                mt: 8,
                py: 6,
                px: { xs: 3, md: 6 },
                backgroundColor: '#ffffff',
                borderRadius: 3,
                boxShadow: theme.shadows[2],
                border: '1px solid rgba(0,0,0,0.05)',
                backgroundImage: 'linear-gradient(to bottom right, #f9f9f9, #ffffff)'
              }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                >
                  <Box
                      component="span"
                      sx={{
                        width: '30px',
                        height: '4px',
                        bgcolor: theme.palette.secondary.main,
                        mr: 2,
                        borderRadius: '2px'
                      }}
                  />
                  Why Choose Thermofoil?
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  With over a decade of excellence in the industry, Thermofoil stands as a leader in custom-built sheds,
                  garages, and premium roofing solutions. We pride ourselves on using only the highest-grade materials,
                  offering nationwide delivery, and providing expert installation services tailored to your specific
                  requirements and land characteristics.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                >
                  <Box
                      component="span"
                      sx={{
                        width: '30px',
                        height: '4px',
                        bgcolor: theme.palette.secondary.main,
                        mr: 2,
                        borderRadius: '2px'
                      }}
                  />
                  Our Comprehensive Services
                </Typography>
                <Box
                    component="ul"
                    sx={{
                      pl: 2,
                      '& li': {
                        mb: 1.5,
                        position: 'relative',
                        pl: '1.75rem',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '0.75rem',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          bgcolor: theme.palette.secondary.main
                        }
                      }
                    }}
                >
                  <li><strong>Custom Shed Design:</strong> Tailored solutions for your unique space</li>
                  <li><strong>Professional Installation:</strong> Expert on-site assembly</li>
                  <li><strong>Technical Consultation:</strong> Roofing and insulation expertise</li>
                  <li><strong>Weather Protection:</strong> Waterproofing and storm-resistant designs</li>
                  <li><strong>Ongoing Support:</strong> Comprehensive after-sales service</li>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
  );
};

export default Home;