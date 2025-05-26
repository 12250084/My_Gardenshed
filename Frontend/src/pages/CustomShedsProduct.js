import React, {useState, useEffect, useContext} from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    CircularProgress,
    Paper,
    Divider,
    Chip,
    Snackbar,
    Alert
} from '@mui/material';
import {Search, FilterList, Clear} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from "../helpers/addToCart";
import Context from "../context";

const AllProductsPage = () => {
    const { productId } = useParams(); // Get productId from URL params
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        brand: 'all'
    });
    const { fetchUserAddToCart } = useContext(Context);

    // Popup state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Extract filter options from products
    const categories = ['all', ...new Set(products.map(p => p.category))];
    const brands = ['all', ...new Set(products.map(p => p.brandName).filter(Boolean))];
    const priceRanges = [
        'all',
        'Under $500',
        '$500 - $1000',
        '$1000 - $5000',
        'Over $5000'
    ];

    const fetchProducts = async () => {
        try {
            const response = await fetch(SummaryApi.allProduct.url);
            const data = await response.json();
            if (data.success) {
                setProducts(data.data);

                // If productId is in URL, filter to show only that product
                if (productId) {
                    const singleProduct = data.data.find(product => product._id === productId);
                    setFilteredProducts(singleProduct ? [singleProduct] : []);
                } else {
                    setFilteredProducts(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const performAddToCart = async (e, productId, type) => {
        try {
            await addToCart(e, productId);
            fetchUserAddToCart();

            // Show success popup
            setSnackbarMessage('Product added to cart successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error adding to cart:', error);

            // Show error popup
            setSnackbarMessage('Failed to add product to cart');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [productId]); // Refetch when productId changes

    useEffect(() => {
        // Only apply filters if we're not showing a single product
        if (!productId) {
            applyFilters();
        }
    }, [filters, searchTerm, products, productId]);

    const applyFilters = () => {
        let result = [...products];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product =>
                (product.productName?.toLowerCase().includes(term) ||
                    (product.description?.toLowerCase().includes(term)) ||
                    (product.brandName?.toLowerCase().includes(term))))
        }

        // Apply category filter
        if (filters.category !== 'all') {
            result = result.filter(product => product.category === filters.category);
        }

        // Apply brand filter
        if (filters.brand !== 'all') {
            result = result.filter(product => product.brandName === filters.brand);
        }

        // Apply price range filter
        switch (filters.priceRange) {
            case 'Under $500':
                result = result.filter(product => product.sellingPrice < 500);
                break;
            case '$500 - $1000':
                result = result.filter(product => product.sellingPrice >= 500 && product.sellingPrice <= 1000);
                break;
            case '$1000 - $5000':
                result = result.filter(product => product.sellingPrice > 1000 && product.sellingPrice <= 5000);
                break;
            case 'Over $5000':
                result = result.filter(product => product.sellingPrice > 5000);
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            category: 'all',
            priceRange: 'all',
            brand: 'all'
        });
        setSearchTerm('');
    };

    return (
        <Box sx={{p: 3}}>
            {/* Only show title and filters if not viewing a single product */}
            {!productId && (
                <>
                    <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
                        Our Product Collection
                    </Typography>

                    {/* Filters Section */}
                    <Paper elevation={2} sx={{p: 3, mb: 4, borderRadius: 2}}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <FilterList color="primary" sx={{mr: 1}}/>
                            <Typography variant="h6">Filter Products</Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: <Search sx={{mr: 1, color: 'action.active'}}/>,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                        label="Category"
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category} value={category}>
                                                {category || 'Uncategorized'}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Brand</InputLabel>
                                    <Select
                                        name="brand"
                                        value={filters.brand}
                                        onChange={handleFilterChange}
                                        label="Brand"
                                    >
                                        {brands.map(brand => (
                                            <MenuItem key={brand} value={brand}>
                                                {brand || 'No Brand'}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Price Range</InputLabel>
                                    <Select
                                        name="priceRange"
                                        value={filters.priceRange}
                                        onChange={handleFilterChange}
                                        label="Price Range"
                                    >
                                        {priceRanges.map(range => (
                                            <MenuItem key={range} value={range}>{range}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                                onClick={resetFilters}
                                startIcon={<Clear/>}
                                color="secondary"
                            >
                                Reset Filters
                            </Button>
                        </Box>
                    </Paper>

                    {/* Results Count */}
                    <Box display="flex" alignItems="center" mb={3}>
                        <Typography variant="subtitle1" sx={{mr: 1}}>
                            Showing {filteredProducts.length} products
                        </Typography>
                        {filters.category !== 'all' && (
                            <Chip label={`Category: ${filters.category}`} sx={{mr: 1}}
                                  onDelete={() => setFilters({...filters, category: 'all'})}/>
                        )}
                        {filters.brand !== 'all' && (
                            <Chip label={`Brand: ${filters.brand}`} sx={{mr: 1}}
                                  onDelete={() => setFilters({...filters, brand: 'all'})}/>
                        )}
                        {filters.priceRange !== 'all' && (
                            <Chip label={`Price: ${filters.priceRange}`}
                                  onDelete={() => setFilters({...filters, priceRange: 'all'})}/>
                        )}
                    </Box>
                </>
            )}

            {/* Loading State */}
            {loading && (
                <Box display="flex" justifyContent="center" my={8}>
                    <CircularProgress size={60}/>
                </Box>
            )}

            {/* Products Grid */}
            {!loading && (
                <Grid
                    justifyContent={'center'}
                    container spacing={4}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <Grid item key={product._id} xs={12} sm={productId ? 12 : 6} md={productId ? 8 : 4} lg={productId ? 6 : 3}>
                                <Card sx={{
                                    width: '100%',
                                    height: productId ? 'auto' : '650px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: productId ? 'none' : 'translateY(-5px)',
                                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                                        borderColor: 'primary.main'
                                    }
                                }}
                                      style={{
                                          minWidth: '320px',
                                          maxHeight: productId ? 'none' : 'calc(100vh - 200px)',
                                      }}
                                >
                                    {/* Image with Badge */}
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                pt: '100%', // Square aspect ratio
                                                backgroundColor: '#f9f9f9',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {product.productImage?.length > 0 ? (
                                                <img
                                                    src={product.productImage[0]}
                                                    alt={product.productName}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />
                                            ) : (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                                }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        No Image Available
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardMedia>

                                        {/* Sale Badge */}
                                        {product.price && product.price !== product.sellingPrice && (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                backgroundColor: 'error.main',
                                                color: 'white',
                                                borderRadius: '12px',
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                zIndex: 1
                                            }}>
                                                SALE
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Product Content */}
                                    <CardContent sx={{
                                        flexGrow: 1,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {/* Category Tag */}
                                        {product.category && (
                                            <Chip
                                                label={product.category}
                                                size="small"
                                                sx={{
                                                    mb: 1.5,
                                                    alignSelf: 'flex-start',
                                                    backgroundColor: 'primary.light',
                                                    color: 'primary.contrastText',
                                                    fontSize: '0.65rem',
                                                    height: '24px'
                                                }}
                                            />
                                        )}

                                        {/* Product Name */}
                                        <Typography
                                            gutterBottom
                                            variant={productId ? "h4" : "h6"}
                                            component="h3"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                display: '-webkit-box',
                                                WebkitLineClamp: productId ? 'none' : 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {product.productName || 'Unnamed Product'}
                                        </Typography>

                                        {/* Brand */}
                                        {product.brandName && (
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    display: 'block',
                                                    fontStyle: 'italic',
                                                    fontSize: productId ? '1rem' : 'inherit'
                                                }}
                                            >
                                                By {product.brandName}
                                            </Typography>
                                        )}

                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            paragraph
                                            sx={{
                                                color: 'text.secondary',
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: productId ? 'none' : 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                flexGrow: 1,
                                                fontSize: productId ? '1.1rem' : 'inherit'
                                            }}
                                        >
                                            {product.description || 'No description available'}
                                        </Typography>

                                        {/* Price Section */}
                                        <Box sx={{ mt: 'auto' }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 1
                                            }}>
                                                <Typography
                                                    variant={productId ? "h4" : "h6"}
                                                    color="primary"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: productId ? '2rem' : '1.25rem'
                                                    }}
                                                >
                                                    {displayINRCurrency(product.sellingPrice || 0)}
                                                </Typography>

                                                {product.price && product.price !== product.sellingPrice && (
                                                    <Typography
                                                        variant={productId ? "h6" : "body2"}
                                                        color="text.disabled"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            fontSize: productId ? '1.5rem' : '0.875rem'
                                                        }}
                                                    >
                                                        {displayINRCurrency(product.price)}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Discount Percentage */}
                                            {product.price && product.price !== product.sellingPrice && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: 'inline-block',
                                                        backgroundColor: 'success.light',
                                                        color: 'success.contrastText',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        fontSize: productId ? '1rem' : 'inherit'
                                                    }}
                                                >
                                                    {Math.round((1 - product.sellingPrice/product.price) * 100)}% OFF
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>

                                    {/* Actions */}
                                    <CardActions sx={{
                                        p: 0,
                                        borderTop: '1px solid rgba(0, 0, 0, 0.08)'
                                    }}>
                                        <Button
                                            fullWidth
                                            size={productId ? "large" : "medium"}
                                            color="success"
                                            variant="contained"
                                            onClick={(e)=>performAddToCart(e,product._id,"product")}
                                            sx={{
                                                py: productId ? 2 : 1.5,
                                                borderRadius: 0,
                                                fontWeight: 600,
                                                color: 'success.light',
                                                '&:hover': {
                                                    backgroundColor: 'success.main',
                                                    color: 'primary.contrastText'
                                                }
                                            }}
                                        >
                                            <span style={{ fontWeight: 600, color: '#fff' }}>
                                            Add to Cart
                                            </span>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Paper elevation={0} sx={{
                                p: 6,
                                textAlign: 'center',
                                borderRadius: '12px',
                                backgroundColor: 'background.paper'
                            }}>
                                <Box sx={{
                                    fontSize: '72px',
                                    lineHeight: 1,
                                    mb: 2,
                                    color: 'text.disabled'
                                }}>
                                    {productId ? '🔍' : '🕵️‍♀️'}
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                    {productId ? 'Product not found' : 'No products found'}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                    {productId
                                        ? 'We couldn\'t find the product you\'re looking for'
                                        : 'We couldn\'t find any products matching your criteria'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={resetFilters}
                                    startIcon={<Clear />}
                                    sx={{
                                        borderRadius: '50px',
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    {productId ? 'Back to Products' : 'Clear All Filters'}
                                </Button>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Snackbar/Popup Notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AllProductsPage;