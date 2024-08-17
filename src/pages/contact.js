import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Card, CardMedia } from '@mui/material';
import NavBar from '../navbar/navbar';
import contactKiwi from '../images/contactKylie.jpg';


const ContactPageComponent = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Me
            </Typography>

            <Grid container spacing={4}>
                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                    <form>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            required
                            type="email"
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            margin="normal"
                            required
                            multiline
                            rows={4}
                        />
                        <Box textAlign="center" marginTop={2}>
                            <Button variant="contained" color="primary" type="submit">
                                Send Message
                            </Button>
                        </Box>
                    </form>
                </Grid>

                {/* Artwork Display */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Artwork"
                            height="100%"
                            image={contactKiwi}
                            title="Artwork Title"
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
            <Box sx={{ padding: 4 }}>
                <ContactPageComponent />
            </Box>
        </>
    )
}

export default ContactPage;
