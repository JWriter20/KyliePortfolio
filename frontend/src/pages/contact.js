import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Card, CardMedia } from '@mui/material';
import NavBar from '../navbar/navbar';

const ContactPageComponent = () => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Contact Me
            </Typography>

            <Grid container spacing={4}>
                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3 }}>
                        <form>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'primary.main',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                required
                                type="email"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'primary.main',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                variant="outlined"
                                margin="normal"
                                required
                                multiline
                                rows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                    '& label.Mui-focused': {
                                        color: 'primary.main',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                            />
                            <Box textAlign="center" marginTop={2}>
                                <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: '50px', padding: '0.5rem 2rem' }}>
                                    Send Message
                                </Button>
                            </Box>
                        </form>
                    </Card>
                </Grid>

                {/* Artwork Display */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt="Artwork"
                            image="https://i.imgur.com/fnI8ApG.jpg"
                            title="Artwork Title"
                            sx={{
                                borderRadius: '8px',
                                maxHeight: '400px',
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const ContactPage = () => {
    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4, backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ContactPageComponent />
            </Box>
        </>
    );
}

export default ContactPage;
