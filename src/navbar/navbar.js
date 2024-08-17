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
        <AppBar position="static" sx={{ background: `linear-gradient(200deg, navy 0%, skyblue 100%)` }} >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Artist Portfolio
                </Typography>
                <Box>
                    <Button onClick={() => navigate("/portfolio")} color="inherit" sx={{ marginRight: 2 }}>Portfolio</Button>
                    <Button onClick={() => navigate("/about")} color="inherit" sx={{ marginRight: 2 }}>The Artist</Button>
                    <Button onClick={() => navigate("/contact")} color="inherit" sx={{ marginRight: 2 }}>Contact</Button>
                    <Button onClick={() => navigate("/process")} color="inherit">The Process</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
