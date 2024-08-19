import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import axios from 'axios';
import { addPortfolioDetail, updatePortfolioDetail, fetchPortfolioDetails } from '../redux/portfolioData.js';

const AddArtworkModal = ({ isModalOpen, handleCloseModal, existingId }) => {
    const dispatch = useDispatch();
    const portfolioDetails = useSelector(state => state.portfolio.portfolioDetails);
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
    const [files, setFiles] = useState([]);

    // Fetch and populate existing artwork data if existingId is provided
    useEffect(() => {
        if (existingId) {
            const existingArtwork = portfolioDetails.find(item => item.id === existingId);
            if (existingArtwork) {
                setArtwork(existingArtwork);
            } else {
                dispatch(fetchPortfolioDetails());
            }
        }
    }, [existingId, dispatch, portfolioDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtwork({ ...artwork, [name]: value });
    };

    const handleFileAdded = (file) => {
        setFiles((prevFiles) => [...prevFiles, file]);
    };

    const handleFileRemoved = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
    };

    const handleSubmit = async () => {
        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('image', file);
                    formData.append('type', 'file'); // or 'base64' if the image is base64 encoded
                    formData.append('title', 'Simple upload');
                    formData.append('description', 'This is a simple image upload in Imgur');

                    try {
                        const response = await axios.post('https://api.imgur.com/3/image', formData, {
                            headers: {
                                Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
                            },
                        });

                        return response.data.data.link;
                    } catch (error) {
                        console.error('Image upload failed', error);
                        throw error; // re-throw to handle this in the outer code
                    }
                })
            );


            const newArtwork = {
                ...artwork,
                imageUrls: [...artwork.imageUrls, ...uploadedImages],
            };
            console.log('New artwork:', newArtwork);

            if (existingId) {
                dispatch(updatePortfolioDetail({ id: existingId, data: newArtwork }));
                dispatch(fetchPortfolioDetails());
                console.log('Artwork updated:', newArtwork);
            } else {
                dispatch(addPortfolioDetail(newArtwork));
                dispatch(fetchPortfolioDetails());
                console.log('Artwork added:', newArtwork);
            }

            // Close the modal after the data is submitted
            handleCloseModal();
        } catch (error) {
            console.error('Error uploading images or submitting artwork:', error);
        }
    };

    const djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: 'image/*',
    };

    const componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: 'no-url', // Imgur API handles the upload, so this is not needed
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
                    {existingId ? 'Edit Artwork' : 'Add New Artwork'}
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
                    {existingId ? 'Update' : 'Submit'}
                </Button>
                <Button onClick={handleCloseModal} sx={{ mt: 2, ml: 2 }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default AddArtworkModal;
