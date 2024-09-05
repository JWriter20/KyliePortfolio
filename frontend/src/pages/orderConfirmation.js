import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const OrderConfirmation = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('session_id');
    const artworkId = new URLSearchParams(location.search).get('painting_id');
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        line1: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });

    useEffect(() => {
        if (sessionId) {
            // Fetch the shipping address from the backend using Axios
            axios.get(`/api/checkout-session/${sessionId}`)
                .then(response => {
                    const data = response.data;
                    if (data.error) {
                        console.error('Error fetching address:', data.error);
                    } else {
                        setAddress({
                            line1: data.address.line1,
                            city: data.address.city,
                            state: data.address.state,
                            postal_code: data.address.postal_code,
                            country: data.address.country,
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching session data:', error);
                });
        }

        if (sessionId && artworkId) {
            axios.post(`/api/transaction/success/${sessionId}/${artworkId}`)
                .then(response => {
                    const data = response.data;
                    if (data.error) {
                        console.error('Error fulfilling order:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Error fulfilling order:', error);
                });
        }
    }, [sessionId, artworkId]); // Dependency array includes artworkId


    return (
        <Box sx={{ padding: 4 }}>
            <IconButton
                edge="start"
                color="inherit"
                onClick={() => navigate('/portfolio')}
                sx={{ mb: 2 }}
            >
                <ArrowBack />
            </IconButton>
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                backgroundColor: 'green',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h2" component="span" color="white">
                                ✔️
                            </Typography>
                        </Box>
                    </motion.div>

                    <Typography variant="h4" align="center" gutterBottom>
                        Order Confirmed!
                    </Typography>
                    <Typography variant="body1" align="center">
                        Your order will ship to:
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                        {address.line1 ? (
                            <>
                                {address.line1}<br />
                                {address.city}, {address.state} {address.postal_code}<br />
                                {address.country}
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </Typography>
                    <Typography variant="body1" align="center">
                        Estimated delivery: 3-5 business days.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default OrderConfirmation;
