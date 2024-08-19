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
    Tabs,
    IconButton,
    Modal,
    Button
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { portfolioItems } from '../portfolioData';
import NavBar from '../navbar/navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import AddArtworkModal from './addArtworkModal';

const PortfolioItem = ({ item, isAdmin }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${item.id}`);
    };

    const handleDelete = () => {
        // Logic to delete the item goes here
        console.log(`Deleted item with ID: ${item.id}`);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', position: 'relative' }}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={item.imageUrls[0]}
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
                {isAdmin && (
                    <IconButton
                        onClick={handleDelete}
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Card>
        </Grid>
    );
};

const Portfolio = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const adminKey = new URLSearchParams(location.search).get('adminKey');
    const isAdmin = adminKey && adminKey === process.env.REACT_APP_ADMIN_KEY;

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filterType = ['All', 'pencil', 'acrylic', 'watercolor'][selectedTab];

    const filteredItems = filterType === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === filterType);

    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {isAdmin && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenModal}
                        sx={{ marginBottom: 4 }}
                    >
                        Add New Artwork
                    </Button>
                )}
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
                        <PortfolioItem key={index} item={item} isAdmin={isAdmin} />
                    ))}
                </Grid>
            </Box>

            <AddArtworkModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
        </>
    );
};

export default Portfolio;
