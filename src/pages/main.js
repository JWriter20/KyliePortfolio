import React from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box
} from '@mui/material';
import { portfolioItems } from '../portfolioData';
import NavBar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';


const PortfolioItem = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Handle the click event, e.g., navigate to a details page or open a modal
        console.log(`Clicked on ${item.title}`);
        navigate(`/details/${item.id}`)
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={item.imageUrl}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={4}>
                    {portfolioItems.map((item, index) => (
                        <PortfolioItem key={index} item={item} />
                    ))}
                </Grid>
            </Box>
        </>
    );
};


export default Portfolio;
