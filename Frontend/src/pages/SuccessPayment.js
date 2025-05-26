import React, {useContext, useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import {CheckCircleOutline} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import SummaryApi from "../common";
import Context from "../context";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const {fetchUserAddToCart} = useContext(Context)
    //GET ORDERiD FROM URL
    const orderId = new URLSearchParams(window.location.search).get('orderId');
    const clearCart = async () => {
        try {
            const response = await fetch(SummaryApi.clearCart.url, {
                method: SummaryApi.clearCart.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.success) {
                console.log('Cart cleared successfully');
            } else {
                console.error('Failed to clear cart:', result.message);
            }
            fetchUserAddToCart()
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    const submitOrder = async () => {
        try {
            const response = await fetch(SummaryApi.submitOrder.url,
                {
                    method: SummaryApi.submitOrder.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({orderId: orderId})
                });
            const result = await response.json();
            if (result.success) {
                console.log('Order submitted successfully');
            } else {
                console.error('Failed to submit order:', result.message);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    }

    useEffect(() => {
        if (orderId) {
            submitOrder().then(async () => {
                clearCart();
            })
        }else{
            navigate('/cart', {
                state: {
                    orderId: orderId
                }
            })
        }

    }, []);

    return (
        <Box textAlign="center" mt={8} px={2}>
            <CheckCircleOutline sx={{fontSize: 100, color: 'green'}}/>
            <Typography variant="h4" mt={2}>Payment Successful!</Typography>
            <Typography variant="subtitle1" mt={1}>Thank you for your purchase.</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{mt: 4}}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default PaymentSuccess;
