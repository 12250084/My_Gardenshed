import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" mt={8} px={2}>
            <ErrorOutline sx={{ fontSize: 100, color: 'red' }} />
            <Typography variant="h4" mt={2}>Payment Failed</Typography>
            <Typography variant="subtitle1" mt={1}>Something went wrong. Please try again.</Typography>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 4, mr: 2 }}
                onClick={() => navigate('/cart')}
            >
                Retry Payment
            </Button>
            <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 4 }}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default PaymentFailure;
