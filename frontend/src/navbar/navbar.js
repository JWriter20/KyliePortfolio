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
import Logo from '../images/WriterStudiosLogo.png';

export default function NavBar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#1e1e1e',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                        sx={{ mr: 2 }}
                    >
                        <img
                            src={Logo}
                            alt="Writer Studios Logo"
                            style={{ height: 40, marginRight: 10 }} // Adjust the logo size and spacing as needed
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 400,
                            letterSpacing: '0.2rem',
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                            color: '#fff',
                        }}
                    >
                        WRITER STUDIOS
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
                                fontWeight: '300',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                                fontWeight: '300',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                                fontWeight: '300',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            Contact
                        </Button>
                        <Button
                            onClick={() => handleNavigation("/process")}
                            sx={{
                                color: '#fff',
                                fontWeight: '300',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
