import React from 'react';
import { Box, Container, Typography, Divider, Grid, Button } from '@mui/material';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <Box sx={{ mt: 0 }}>
      {/* Full-width Hero Banner - new image, no top margin */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 320, md: 550 },
          backgroundImage:
            'url(https://img.freepik.com/free-photo/small-house-wooden-shed-garden-with-copy-space_23-2149606825.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'white',
        }}
      >
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', p: 4, ml: 5, borderRadius: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            Thermofoil Sheds
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Built Strong, Styled Smart — Explore Our Range Today
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 3 }}>
            Discover More
          </Button>
        </Box>
      </Box>

      {/* Trusted Brands Section */}
      <Box sx={{ py: 5, backgroundColor: '#f1f1f1' }}>
        <Container>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Trusted Brands We Use
          </Typography>
          <Grid container justifyContent="center" spacing={4}>
            <Grid item>
              <img src="https://1000logos.net/wp-content/uploads/2022/08/Colorbond-Logo.png" alt="Colorbond" style={{ height: 60 }} />
            </Grid>
            <Grid item>
              <img src="https://www.bluescopesteel.com.au/lib/images/logos/logo-2021.svg" alt="BlueScope" style={{ height: 60 }} />
            </Grid>
            <Grid item>
              <img src="https://www.stratco.com.au/siteassets/brand/stratco-logo.svg" alt="Stratco" style={{ height: 60 }} />
            </Grid>
            <Grid item>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Bunnings_Warehouse_logo.svg" alt="Bunnings" style={{ height: 60 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 5 }}>
        {/* CTA Banner */}
        <Box
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            mb: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">Custom-Built Sheds to Match Your Needs</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Explore our full range or design your own shed with our custom builder tool.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            Start Building
          </Button>
        </Box>

        {/* Category Section */}
        <Typography variant="h5" gutterBottom textAlign="center">
          Shop by Category
        </Typography>
        <CategoryList />

        <Divider sx={{ my: 5 }} />

        <BannerProduct />

        <Divider sx={{ my: 5 }} />

        {/* Featured Products */}
        <Typography variant="h5" gutterBottom textAlign="center">
          Explore Our Range
        </Typography>

        <VerticalCardProduct category={"garden-sheds"} heading={"Garden Sheds"} />
        <VerticalCardProduct category={"workshop-sheds"} heading={"Workshop Sheds"} />
        <VerticalCardProduct category={"garage-sheds"} heading={"Garage Sheds"} />
        <VerticalCardProduct category={"storage-units"} heading={"Storage Units"} />
        <VerticalCardProduct category={"aviaries-pet-shelters"} heading={"Aviaries & Pet Shelters"} />
        <VerticalCardProduct category={"roofing-sheets"} heading={"Roofing Sheets"} />
        <VerticalCardProduct category={"mcfoil-insulation"} heading={"Foil Insulation (MCFOIL)"} />
        <VerticalCardProduct category={"custom-sheds"} heading={"Custom Shed Builder"} />

        {/* Info Section */}
        <Box sx={{ mt: 6, py: 4, px: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Why Choose Thermofoil?
              </Typography>
              <Typography>
                With over a decade of experience, Thermofoil is a trusted name in custom-built sheds,
                garages, and roofing solutions. We use high-grade materials, deliver Australia-wide, and
                provide tailored installation services to suit your land.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Services We Provide
              </Typography>
              <ul>
                <li>Custom Shed Design</li>
                <li>On-Site Installation</li>
                <li>Roofing and Insulation Advice</li>
                <li>Waterproofing and Storm Protection</li>
                <li>After-sales Maintenance Support</li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;