import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const OrderFailure = () => {
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('error_message') || "There was a problem processing your order.";

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: -360, scale: 1 }}
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
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h2" component="span" color="white">
                            ✘
                        </Typography>
                    </Box>
                </motion.div>

                <Typography variant="h4" align="center" gutterBottom>
                    Order Failed
                </Typography>
                <Typography variant="body1" align="center">
                    {errorMessage}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                    Please check your payment details or try again later.
                </Typography>
                <Typography variant="body1" align="center">
                    If the problem persists, contact our support team.
                </Typography>
            </Paper>
        </Container>
    );
};

export default OrderFailure;
