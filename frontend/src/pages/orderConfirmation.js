import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
    const address = "123 Main St, Springfield, USA"; // Replace with dynamic data if necessary

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
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
                    {address}
                </Typography>
                <Typography variant="body1" align="center">
                    Estimated delivery: 3-5 business days.
                </Typography>
            </Paper>
        </Container>
    );
};

export default OrderConfirmation;
