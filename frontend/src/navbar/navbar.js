import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{
                background: `linear-gradient(200deg, #3a0ca3 0%, #f72585 100%)`,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'Cursive',
                        fontWeight: 'bold',
                        letterSpacing: '0.1rem'
                    }}
                >
                    Writer Studios
                </Typography>
                <Box>
                    <Button
                        onClick={() => navigate("/portfolio")}
                        sx={{
                            marginRight: 2,
                            color: '#fff',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        Portfolio
                    </Button>
                    <Button
                        onClick={() => navigate("/about")}
                        sx={{
                            marginRight: 2,
                            color: '#fff',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        The Artist
                    </Button>
                    <Button
                        onClick={() => navigate("/contact")}
                        sx={{
                            marginRight: 2,
                            color: '#fff',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        Contact
                    </Button>
                    <Button
                        onClick={() => navigate("/process")}
                        sx={{
                            color: '#fff',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                        }}
                    >
                        The Process
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
