import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Grid,
  Divider,
  Paper,
} from '@mui/material';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id, quantity: qty }),
    });
    const result = await response.json();
    if (result.success) fetchData();
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });
    const result = await response.json();
    if (result.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = data.reduce(
    (acc, cur) => acc + cur.quantity * cur?.productId?.sellingPrice,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Shopping Cart
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography align="center">No items in your cart</Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box flex={2}>
            {data.map((item) => (
              <Card
                key={item._id}
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  p: 2,
                  borderRadius: 4,
                  boxShadow: 3,
                  backgroundColor: '#fafafa',
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', sm: 200 },
                    height: { xs: 200, sm: 'auto' },
                    objectFit: 'contain',
                    background: '#f0f0f0',
                    borderRadius: 2,
                  }}
                  image={item?.productId?.productImage[0]}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                      {item?.productId?.productName}
                    </Typography>
                    <IconButton color="error" onClick={() => deleteCartProduct(item._id)}>
                      <MdDelete />
                    </IconButton>
                  </Box>
                  <Typography color="text.secondary" mb={1}>
                    {item?.productId?.category}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography color="primary">
                      {displayINRCurrency(item?.productId?.sellingPrice)}
                    </Typography>
                    <Typography fontWeight="bold">
                      {displayINRCurrency(item?.productId?.sellingPrice * item.quantity)}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQty(item._id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => updateQty(item._id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box flex={1} sx={{ position: { md: 'sticky' }, top: 100 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Total Quantity</Typography>
                <Typography>{totalQty}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Total Price</Typography>
                <Typography>{displayINRCurrency(totalPrice)}</Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                Proceed to Payment
              </Button>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
