import React, { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    Tab,
    Tabs
} from '@mui/material';
import { portfolioItems } from '../portfolioData';
import NavBar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';

const PortfolioItem = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${item.id}`);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={item.imageUrl}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: 'bold' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                            {item.details}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            {item.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const Portfolio = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filterType = ['All', 'pencil', 'acrylic', 'watercolor'][selectedTab];

    const filteredItems = filterType === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === filterType);

    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ marginBottom: 4 }}
                >
                    <Tab label="All" />
                    <Tab label="Pencil" />
                    <Tab label="Acrylic" />
                    <Tab label="Watercolor" />
                </Tabs>
                <Grid container spacing={4}>
                    {filteredItems.map((item, index) => (
                        <PortfolioItem key={index} item={item} />
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default Portfolio;
