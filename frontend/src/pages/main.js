import React, { useState, useEffect } from 'react';
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
    Button
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Edit } from '@mui/icons-material';
import NavBar from '../navbar/navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import AddArtworkModal from './addArtworkModal';
import { useDispatch, useSelector } from 'react-redux';
import { deletePortfolioDetail, fetchPortfolioDetails } from '../redux/portfolioData.js';

const PortfolioItem = ({ item, isAdmin, handleEdit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate(`/details/${item.id}`);
    };

    const handleDelete = () => {
        dispatch(deletePortfolioDetail(item.id));
    };

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ transition: 'all 0.5s ease' }}>
            <Card
                sx={{
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%', // Ensure the card takes full height
                }}
            >
                <CardActionArea
                    onClick={handleClick}
                    sx={{
                        height: '100%',
                        '&:hover .MuiCardContent-root': {
                            transform: 'translateY(0)',
                            opacity: 1,
                        },
                        '& .MuiCardContent-root': {
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: 'translateY(100%)',
                            opacity: 0,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={item.imageUrls[0]} // Assuming imageUrls contains public URLs
                        alt={item.title}
                        sx={{
                            height: '60vh', // Set a taller height for the image
                            width: '100%',
                            objectFit: 'cover', // Ensure the image covers the entire area
                        }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: 'bold' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                            {item.details}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            ${item.price / 100}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {isAdmin && (
                    <>
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
                        <IconButton
                            onClick={() => handleEdit(item.id)}
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 55,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </>
                )}
            </Card>
        </Grid>
    );
};

const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolioItems = useSelector((state) => state.portfolio.portfolioDetails);
    const portfolioStatus = useSelector((state) => state.portfolio.status);
    const [selectedTab, setSelectedTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState({ open: false, id: null });
    const location = useLocation();
    const adminKey = new URLSearchParams(location.search).get('adminKey');
    const isAdmin = adminKey && adminKey === process.env.REACT_APP_ADMIN_KEY;

    useEffect(() => {
        if (portfolioStatus === 'idle') {
            dispatch(fetchPortfolioDetails());
        }
    }, [portfolioStatus, dispatch]);

    useEffect(() => {
        const handleResize = () => {
            // Force a re-render on resize
            setSelectedTab((prev) => prev);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleOpenModal = () => {
        setIsModalOpen({ open: true, id: null });
    };

    const handleCloseModal = () => {
        setIsModalOpen({ open: false, id: null });
    };

    const handleEdit = (id) => {
        setIsModalOpen({ open: true, id });
    }

    const filterType = ['All', 'pencil', 'acrylic', 'watercolor'][selectedTab];

    const filteredItems = filterType === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === filterType);

    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    sx={{
                        marginBottom: 4,
                        '.MuiTabs-flexContainer': {
                            justifyContent: 'center',
                            gap: '12px',
                        },
                        '.MuiTab-root': {
                            minWidth: '80px',
                            padding: '10px 16px',
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#6b6b6b',
                            textTransform: 'capitalize',
                            transition: 'color 0.3s, transform 0.3s',
                            '&:hover': {
                                color: '#333',
                                transform: 'scale(1.05)',
                            },
                            '&.Mui-selected': {
                                color: '#1976d2',
                                fontWeight: 'bold',
                            },
                        },
                        '.MuiTabs-indicator': {
                            height: '3px',
                            borderRadius: '2px',
                        },
                    }}
                >
                    <Tab label="All" />
                    <Tab label="Pencil" />
                    <Tab label="Acrylic" />
                    <Tab label="Watercolor" />
                </Tabs>
                <Grid container spacing={4} sx={{
                    transition: 'all 0.5s ease', // Add smooth transition to the grid container
                }}>
                    {filteredItems.map((item, index) => {
                        return <PortfolioItem key={index} item={item} isAdmin={isAdmin} handleEdit={handleEdit} />;
                    })}
                </Grid>
            </Box>

            <AddArtworkModal isModalOpen={isModalOpen.open} handleCloseModal={handleCloseModal} existingId={isModalOpen.id || null} />
        </>
    );
};

export default Portfolio;

