import React from 'react';
import { Container, Grid, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import NavBar from '../navbar/navbar';

const ArtworkProcessPageComponent = () => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                The Art Creation Process
            </Typography>

            <Grid container spacing={4}>
                {/* Process Description */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                                Step 1: Inspiration and Concept
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                                Every artwork starts with an idea, a moment of inspiration. This could be a scene from nature, a fleeting emotion, or a conceptual thought. The process begins by sketching rough ideas and brainstorming on how to bring the vision to life.
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                                Step 2: Sketching and Planning
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                                Once the concept is solidified, the next step is to sketch out the design. This phase involves experimenting with different compositions, perspectives, and color schemes.
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                                Step 3: Bringing the Artwork to Life
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                                The final step involves applying paint, ink, or digital mediums to bring the artwork to life. Each brushstroke is deliberate, each color chosen to evoke a specific feeling or atmosphere.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Picture of Artist Working */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt="Artist Working"
                            image="https://i.imgur.com/qK5WfBJ.jpg"
                            title="Artist Working"
                            sx={{
                                borderRadius: '8px',
                                maxWidth: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const ArtworkProcessPage = () => {
    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ArtworkProcessPageComponent />
            </Box>
        </>
    )
};

export default ArtworkProcessPage;
