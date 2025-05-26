import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { Box } from '@mui/material';
import ChatBot from './components/ChatBot'; // Import the ChatBot component

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
      <Context.Provider
          value={{
            fetchUserDetails,
            cartProductCount,
            fetchUserAddToCart
          }}
      >
        <ToastContainer position="top-center" />

        <Header />

        {/* Main content with proper padding for fixed header */}
        <Box
            component="main"
            sx={{
              pt: { xs: '104px' }, // offset for header + tagline
              minHeight: 'calc(100vh - 160px)', // 160px accounts for header + footer height
              backgroundColor: '#f9fafb'
            }}
        >
          <Outlet />
        </Box>

        <Footer />

        {/* Add ChatBot component */}
        <ChatBot />
      </Context.Provider>
  );
}

export default App;