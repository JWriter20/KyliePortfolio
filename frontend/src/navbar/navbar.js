import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDrawerOpen(false); // Close drawer after navigation
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: `linear-gradient(200deg, #3a0ca3 0%, #f72585 100%)`,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            letterSpacing: '0.1rem'
                        }}
                    >
                        Writer Studios
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Button
                            onClick={() => handleNavigation("/portfolio")}
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
                            onClick={() => handleNavigation("/about")}
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
                            onClick={() => handleNavigation("/contact")}
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
                            onClick={() => handleNavigation("/process")}
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
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    <ListItemButton onClick={() => handleNavigation("/portfolio")}>
                        <ListItemText primary="Portfolio" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation("/about")}>
                        <ListItemText primary="The Artist" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation("/contact")}>
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleNavigation("/process")}>
                        <ListItemText primary="The Process" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}
