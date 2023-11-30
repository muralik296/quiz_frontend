import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AboutPage = () => {
    return (
        <Container sx={{ paddingTop: 4 }}>
            
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    About Quiz App
                </Typography>

                <Typography paragraph>
                    Welcome to Quiz App, a platform designed to help teachers create quizzes
                    and students to participate in them. It provides an interactive and
                    educational environment for learning and testing your knowledge.
                </Typography>

                <Typography paragraph>
                    Whether you are a teacher creating quizzes or a student looking to
                    challenge yourself, Quiz App offers a user-friendly experience.
                </Typography>

                <Typography paragraph>
                    <NavLink to="/login">Already Registered to our app? Login Here!</NavLink>
                </Typography>
                <Typography paragraph>
                    <NavLink to="/register">New User? Register Here</NavLink>
                </Typography>
                <Typography paragraph>
                    Developed By:
                    <ul>
                        <li>Maneendra Burrannagari</li>
                        <li>Sathya Sai</li>
                        <li>Sumedh Kulkarni</li>
                        <li>Priyash</li>
                    </ul>
                </Typography>
            </Paper>
        </Container>
    );
};

export default AboutPage;
