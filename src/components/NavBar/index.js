import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <QuizIcon />
                    </Link>
                </Typography>
                {/* <Button color="inherit" component={Link} to="/about">
                    About
                </Button> */}
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
