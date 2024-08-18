import React from 'react';
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
import { portfolioItems } from '../portfolioData';
import NavBar from '../navbar/navbar';

const PortfolioItemDetailsComponent = () => {
    const { id } = useParams();
    const item = portfolioItems.find((item) => item.id === parseInt(id));

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
                            height="40%"
                            image={item.imageUrl}
                            alt={item.title}
                        />
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.details}
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="h6">Price: {item.price}</Typography>
                                <Typography variant="body1">
                                    Size: {item.size}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Purchase Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Artist: {item.artist}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Medium: {item.medium}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Availability: {item.availability}
                    </Typography>
                    <Box mt={3}>
                        <Button variant="contained" color="primary" fullWidth>
                            Add to Cart
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
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
