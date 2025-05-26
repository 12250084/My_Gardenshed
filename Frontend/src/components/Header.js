import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
  Typography,
  Container,
  Stack,
  Link as MuiLink
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  ShoppingCart,
  AccountCircle
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.grey[200], 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[300], 1),
  },
  width: 250,
  marginLeft: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 4, 2, 0), // Increased padding for taller input
    width: '100%',
  },
}));

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : '/search');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?.role === ROLE.ADMIN && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/admin-panel/all-products">
          Admin Panel
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      {/* Top Info Bar */}
      <Box sx={{ backgroundColor: '#1e40af', color: 'white', py: 0.5 }}>
        <Container maxWidth="xl">
          <Typography variant="body2" align="center">
            🏗️ Shed Customization Experts | 🧰 Thermofoil Paneling | 📦 Free Delivery Over $500
          </Typography>
        </Container>
      </Box>

      {/* Main Header */}
      <AppBar position="fixed" sx={{ backgroundColor: '#2563eb', color: '#fff', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 3, minHeight: '100px !important' }}>
            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                fontSize: '2rem'
              }}
            >
              ShedCraft
            </Typography>

            {/* Nav Links */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MuiLink component={Link} to="/" underline="none" sx={{ color: 'white' }}>Home</MuiLink>
              <MuiLink component={Link} to="/custom-sheds" underline="none" sx={{ color: 'white' }}>Custom Sheds</MuiLink>
              <MuiLink component={Link} to="/thermofoil" underline="none" sx={{ color: 'white' }}>Thermofoil</MuiLink>
              <MuiLink component={Link} to="/contact" underline="none" sx={{ color: 'white' }}>Contact</MuiLink>
            </Stack>

            {/* Right Section */}
            <Box display="flex" alignItems="center" gap={2}>
              {/* Search */}
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  value={search}
                  onChange={handleSearch}
                />
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Search>

              {/* Cart */}
              {user?._id && (
                <IconButton component={Link} to="/cart" size="large" sx={{ color: 'white' }}>
                  <Badge badgeContent={context?.cartProductCount || 0} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              )}

              {/* Auth Buttons */}
              {user?._id ? (
                <>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ color: 'white' }}>
                    {user?.profilePic ? (
                      <Avatar src={user.profilePic} alt={user.name} />
                    ) : (
                      <AccountCircle fontSize="large" />
                    )}
                  </IconButton>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogout}
                    sx={{ borderRadius: 5, textTransform: 'none', color: 'white', borderColor: 'white' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    sx={{ textTransform: 'none', color: 'white' }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/sign-up"
                    sx={{
                      borderRadius: 5,
                      textTransform: 'none',
                      backgroundColor: 'white',
                      color: '#2563eb',
                      '&:hover': { backgroundColor: '#f1f5f9' }
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {renderMenu}
    </>
  );
};

export default Header;
