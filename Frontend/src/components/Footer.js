import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Container,
  Divider
} from '@mui/material';

import {
  ExpandMore,
  Facebook,
  Instagram,
  Twitter,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#111827', mt: 8, pt: 6, pb: 4, color: '#ffffff' }}>
      <Container>
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>About ThermoOil</Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
              ThermoOil is a trusted supplier of high-performance industrial thermal oils and heating solutions.
              We deliver reliability, safety, and sustainability to a wide range of industries.
            </Typography>
          </Grid>

          {/* Quick Links with Accordion */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Quick Links</Typography>
            <Accordion elevation={0} sx={{ backgroundColor: 'transparent', color: '#cbd5e1' }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#cbd5e1' }} />}>
                <Typography>Products</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Thermal Oils</Typography>
                <Typography variant="body2">Heat Transfer Fluids</Typography>
                <Typography variant="body2">Cleaning Solutions</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0} sx={{ backgroundColor: 'transparent', color: '#cbd5e1' }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#cbd5e1' }} />}>
                <Typography>Resources</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">Safety Guidelines</Typography>
                <Typography variant="body2">Technical Data Sheets</Typography>
                <Typography variant="body2">FAQs</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Contact Us</Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOn sx={{ color: '#cbd5e1' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                123 Heat Lane, Energy City, EC101
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Phone sx={{ color: '#cbd5e1' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                +44 1234 567 890
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Email sx={{ color: '#cbd5e1' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                info@thermooil.co.uk
              </Typography>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Follow Us</Typography>
            <Box display="flex" gap={2}>
              <IconButton
                sx={{ color: '#cbd5e1', '&:hover': { color: '#38bdf8' } }}
                aria-label="facebook"
                href="https://facebook.com"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: '#cbd5e1', '&:hover': { color: '#f472b6' } }}
                aria-label="instagram"
                href="https://instagram.com"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ color: '#cbd5e1', '&:hover': { color: '#60a5fa' } }}
                aria-label="twitter"
                href="https://twitter.com"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 5, mb: 2, backgroundColor: '#374151' }} />

        <Typography variant="body2" align="center" sx={{ color: '#9ca3af' }}>
          © 2025 ThermoOil Ltd. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
