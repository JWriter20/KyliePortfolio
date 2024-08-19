import React, { useState, useEffect } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
    Paper,
    IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../navbar/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioDetails } from '../redux/portfolioData.js';
import { useStripe } from '@stripe/react-stripe-js';

const PortfolioItemDetailsComponent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const portfolioItems = useSelector((state) => state.portfolio.portfolioDetails);
    const portfolioStatus = useSelector((state) => state.portfolio.status);
    const [selectedImage, setSelectedImage] = useState('');
    const stripe = useStripe(); // Move useStripe here

    useEffect(() => {
        if (portfolioStatus === 'idle') {
            dispatch(fetchPortfolioDetails());
        }
    }, [portfolioStatus, dispatch]);

    const item = portfolioItems.find((item) => item.id === parseInt(id));

    useEffect(() => {
        if (item) {
            setSelectedImage(item.imageUrls[0]);
        }
    }, [item]);

    const handleCheckout = async () => {
        try {
            const response = await fetch(`/api/checkout/${id}`, {
                method: 'POST',
            });

            const data = await response.json();

            if (data.error) {
                console.error('Error creating checkout session:', data.error);
                return;
            }

            const { error } = await stripe.redirectToCheckout({
                sessionId: data.id,
            });

            if (error) {
                console.error('Stripe checkout error:', error);
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    if (portfolioStatus === 'loading') {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>;
    }

    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={selectedImage}
                            alt={item.title}
                            sx={{ width: '100%', height: 'auto' }}
                        />
                        <Box display="flex" justifyContent="center" my={2}>
                            {item.imageUrls.map((url, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={url}
                                    alt={`Preview ${index + 1}`}
                                    onClick={() => setSelectedImage(url)}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: '0 8px',
                                        cursor: 'pointer',
                                        border: selectedImage === url ? '2px solid #1976d2' : '2px solid transparent',
                                        transition: 'border 0.3s',
                                    }}
                                />
                            ))}
                        </Box>
                    </Card>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {item.details}
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="h6">Price: ${item.price / 100}</Typography>
                        <Typography variant="body1">
                            Size: {item.width} x {item.height}
                        </Typography>
                        <Typography variant="body1">
                            Weight: {item.weight}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Medium: {item.type}
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
                            Buy Now
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

const PortfolioItemDetails = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => navigate('/portfolio')}
                    sx={{ mb: 2 }}
                >
                    <ArrowBack />
                </IconButton>
                <PortfolioItemDetailsComponent />
            </Box>
        </>
    )
};

export default PortfolioItemDetails;
