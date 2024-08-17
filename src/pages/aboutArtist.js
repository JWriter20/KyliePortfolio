import React from 'react';
import { Container, Grid, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import NavBar from '../navbar/navbar';

const AboutTheArtistComponent = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                About the Artist
            </Typography>

            <Grid container spacing={4}>
                {/* Artist Description */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Meet the Artist
                            </Typography>
                            <Typography variant="body1" paragraph>
                                [Artist Name] is a contemporary artist known for their unique approach to [describe the type of art they create, e.g., painting, sculpture, digital art]. With a passion for [mention specific themes or inspirations], [Artist Name] has been creating thought-provoking pieces that resonate with viewers worldwide.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                [He/She/They] began [his/her/their] artistic journey at a young age, finding inspiration in [mention specific influences, e.g., nature, urban landscapes, personal experiences]. Over the years, [Artist Name] has developed a distinct style that blends [describe the style or techniques used] to create visually stunning and emotionally charged artwork.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                [Artist Name]’s work has been exhibited in [mention galleries, exhibitions, or any notable achievements], and continues to push the boundaries of [his/her/their] artistic expression. When not in the studio, [Artist Name] enjoys [mention hobbies or interests, e.g., exploring new cultures, hiking, reading], which often serve as inspiration for [his/her/their] next project.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Picture of the Artist */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Artist Portrait"
                            height="100%"
                            image="/path-to-your-image/artist-portrait.jpg"
                            title="Artist Portrait"
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const AboutTheArtistPage = () => {
    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4 }}>
                <AboutTheArtistComponent />
            </Box>
        </>
    )
};

export default AboutTheArtistPage;
