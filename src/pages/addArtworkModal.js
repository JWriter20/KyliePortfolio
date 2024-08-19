import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

const AddArtworkModal = ({ isModalOpen, handleCloseModal }) => {
    const [artwork, setArtwork] = useState({
        title: '',
        price: '',
        type: '',
        width: '',
        height: '',
        weight: '',
        details: '',
        imageUrls: [],
    });

    const clientId = 'YOUR_IMGUR_CLIENT_ID';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtwork({ ...artwork, [name]: value });
    };

    const handleFileAdded = (file) => {
        setArtwork((prevArtwork) => ({
            ...prevArtwork,
            imageUrls: [...prevArtwork.imageUrls, file],
        }));
    };

    const handleFileRemoved = (file) => {
        setArtwork((prevArtwork) => ({
            ...prevArtwork,
            imageUrls: prevArtwork.imageUrls.filter(
                (imageFile) => imageFile.name !== file.name
            ),
        }));
    };

    const uploadImageToImgur = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: `Client-ID ${clientId}`,
                },
            });

            return response.data.data.link; // Return the link of the uploaded image
        } catch (error) {
            console.error('Error uploading image to Imgur:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        // Upload images to Imgur and get the URLs
        const uploadedImageUrls = await Promise.all(
            artwork.imageUrls.map((file) => uploadImageToImgur(file))
        );

        // Set the imageUrls in the artwork object to the Imgur URLs
        const updatedArtwork = {
            ...artwork,
            imageUrls: uploadedImageUrls.filter((url) => url !== null),
        };

        // Submit the form data
        console.log(updatedArtwork);

        // Handle modal close
        handleCloseModal();
    };

    const djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
    };

    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: 'no-url', // this is a placeholder URL; in a real application, you would use the URL of your server to upload images
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="add-artwork-modal"
            aria-describedby="add-artwork-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                m: 2,
            }}>
                <Typography id="add-artwork-modal" variant="h6" component="h2">
                    Add New Artwork
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={artwork.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={artwork.price}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Type"
                            name="type"
                            value={artwork.type}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Width"
                            name="width"
                            value={artwork.width}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Height"
                            name="height"
                            value={artwork.height}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Weight"
                            name="weight"
                            value={artwork.weight}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Details"
                            name="details"
                            multiline
                            rows={3}
                            value={artwork.details}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="div">
                            Upload Images
                        </Typography>
                        <DropzoneComponent
                            config={componentConfig}
                            djsConfig={djsConfig}
                            eventHandlers={{
                                addedfile: handleFileAdded,
                                removedfile: handleFileRemoved,
                            }}
                        />
                    </Grid>
                </Grid>

                <Button onClick={handleSubmit} sx={{ mt: 2 }} variant="contained" color="primary">
                    Submit
                </Button>
                <Button onClick={handleCloseModal} sx={{ mt: 2, ml: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default AddArtworkModal;
