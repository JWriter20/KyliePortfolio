import React, { useState } from 'react';
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

const PortfolioItemDetailsComponent = ({ portfolioItems }) => {
    const { id } = useParams();
    const item = portfolioItems.find((item) => item.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(item.imageUrls[0]);

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
                        <Typography variant="h6">Price: {item.price}</Typography>
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
                        <Button variant="contained" color="primary" fullWidth>
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
