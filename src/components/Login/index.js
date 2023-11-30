// LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    TextField,
    Button,
    Radio,
    FormControlLabel,
    RadioGroup,
    Typography,
    Snackbar
} from '@mui/material';
import TeacherView from '../TeacherView';
import StudentView from '../StudentView';

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        email_id: '',
        password: '',
        is_teacher: false,
    });

    const [data, setData] = useState(null);
    const [err, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/login/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setData(response.data);
        } catch (error) {
            setError(error);

            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (formData.is_teacher && data && !err) {
        return <TeacherView data={data} handleData={setData} />;
    }
    if (!formData.is_teacher && data && !err) {
        return <StudentView data={data} />;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px', width: '100%' , background: '#fff'}}>
                <form>
                    <Typography variant="h5" component="div" style={{ marginBottom: '16px' }}>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email address"
                        variant="outlined"
                        type="email"
                        name="email_id"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                        required
                        style={{ marginBottom: '16px' }}
                        autoComplete='off'
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        required
                        style={{ marginBottom: '16px' }}
                        autoComplete='off'

                    />
                    <RadioGroup
                        row
                        aria-label="userType"
                        name="is_teacher"
                        value={formData.is_teacher ? 'Teacher' : 'Student'}
                        onChange={(e) => setFormData({ ...formData, is_teacher: e.target.value === 'Teacher' })}
                        style={{ marginBottom: '16px' }}
                    >
                        <FormControlLabel
                            value="Student"
                            control={<Radio color="primary" />}
                            label="Student"
                        />
                        <FormControlLabel
                            value="Teacher"
                            control={<Radio color="primary" />}
                            label="Teacher"
                        />
                    </RadioGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin();
                            setSnackbarOpen(true);
                        }}
                        style={{ marginTop: '16px' }}
                    >
                        Login
                    </Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={2000}
                        onClose={handleSnackbarClose}
                        message="Login Successful!"
                    />
                    <div style={{ color: 'red', marginTop: '16px' }}>
                        {err ? <div className='alert alert-danger'>{err?.response?.data?.error}</div> : null}
                    </div>
                </form>
            </Paper>
        </div>
    );
};

export default LoginComponent;
