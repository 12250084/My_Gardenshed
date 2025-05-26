import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    CardMedia,
    Button,
    CircularProgress,
    Divider,
    Paper,
} from '@mui/material';
import {MdDelete} from 'react-icons/md';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const [address, setAddress] = useState({
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
    })

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
            body: JSON.stringify({_id: id, quantity: qty}),
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
            body: JSON.stringify({_id: id}),
        });
        const result = await response.json();
        if (result.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const getProductDetails = (item) => {
        if (item.itemType === 'thermofoil') {
            return {
                name: item.itemId?.name,
                image: item.itemId?.image?.[0],
                price: item.itemId?.pricePerUnit,
                category: 'Thermofoil',
                brand: item.itemId?.brand
            };
        } else {
            return {
                name: item?.itemId?.productName,
                image: item?.itemId?.productImage?.[0],
                price: item?.itemId?.sellingPrice,
                category: item?.itemId?.category,
                brand: item?.itemId?.brand
            };
        }
    };

    const totalQty = data.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = data.reduce((acc, cur) => {
        const price = cur.itemType === 'thermofoil'
            ? cur.itemId?.pricePerUnit
            : cur?.itemId?.sellingPrice;
        return acc + (cur.quantity * (price || 0));
    }, 0);

    const handleCheckout = async () => {
        const response = await fetch(`${SummaryApi.createCheckoutSession.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                cartItems: data,
                address: address.address + ', ' + address.city + ', ' + address.state + ', ' + address.postalCode,
                phoneNo: address.phone,
            })
        });

        const result = await response.json();

        if (result.url) {
            window.location.href = result.url; // Redirect to Stripe Checkout
        }
    };

    return (
        <Box sx={{p: 4}}>
            <Typography variant="h5" sx={{mb: 3, textAlign: 'center'}}>
                Shopping Cart
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress/>
                </Box>
            ) : data.length === 0 ? (
                <Typography align="center">No items in your cart</Typography>
            ) : (
                <Box sx={{display: 'flex', gap: 4, flexDirection: {xs: 'column', md: 'row'}}}>
                    <Box flex={2}>
                        {data.map((item) => {
                            const product = getProductDetails(item);
                            return (
                                <Card
                                    key={item._id}
                                    sx={{
                                        mb: 3,
                                        display: 'flex',
                                        flexDirection: {xs: 'column', sm: 'row'},
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
                                            width: {xs: '100%', sm: 200},
                                            height: {xs: 200, sm: 'auto'},
                                            objectFit: 'contain',
                                            background: '#f0f0f0',
                                            borderRadius: 2,
                                        }}
                                        image={product.image || 'https://via.placeholder.com/200'}
                                        alt={product.name}
                                    />
                                    <CardContent sx={{flex: 1}}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6">
                                                {product.name}
                                            </Typography>
                                            <IconButton color="error" onClick={() => deleteCartProduct(item._id)}>
                                                <MdDelete/>
                                            </IconButton>
                                        </Box>
                                        <Typography color="text.secondary" mb={1}>
                                            {product.brand && `${product.brand} • `}{product.category}
                                        </Typography>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                            <Typography color="primary">
                                                {displayINRCurrency(product.price)}
                                            </Typography>
                                            <Typography fontWeight="bold">
                                                {displayINRCurrency(product.price * item.quantity)}
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
                            );
                        })}
                    </Box>

                    <Box flex={1} sx={{position: {md: 'sticky'}, top: 100}}>
                        <Paper elevation={3} sx={{p: 3, borderRadius: 4}}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider sx={{mb: 2}}/>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography>Total Quantity</Typography>
                                <Typography>{totalQty}</Typography>
                            </Box>
                            {/*Delivery Address */}
                            <Box mb={2}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Delivery Address
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={1}>
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={address.phone}
                                        onChange={(e) => setAddress({...address, phone: e.target.value})}
                                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address.address}
                                        onChange={(e) => setAddress({...address, address: e.target.value})}
                                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={address.city}
                                        onChange={(e) => setAddress({...address, city: e.target.value})}
                                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={address.state}
                                        onChange={(e) => setAddress({...address, state: e.target.value})}
                                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        value={address.postalCode}
                                        onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                                    />
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography>Total Price</Typography>
                                <Typography>{displayINRCurrency(totalPrice)}</Typography>
                            </Box>
                            <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
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