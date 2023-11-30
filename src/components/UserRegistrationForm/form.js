import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import styles from './form.module.css';
import TeacherRegistrationForm from "./TeacherRegistration";
import StudentRegistrationForm from "./StudentRegistration";
import { NavLink } from 'react-router-dom';


function UserRegistration() {
    const [isRegistrationLoading, setRegistrationLoading] = useState(false);
    const [data, setData] = useState(null);
    const [is_teacher, setUser] = useState(false);
    const [requestBody, setRequestBody] = useState({ is_teacher: false });

    const handleRadioChange = (event) => {
        setUser(event.target.value === 'Teacher');
        setRequestBody((prev) => ({
            ...prev,
            is_teacher: event.target.value === 'Teacher',
        }));
    };

    const handleRequestBodyChange = (event) => {
        const { name, value } = event.target;
        setRequestBody((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmission = async (event) => {
        event.preventDefault();
        setRegistrationLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8000/quiz/registration/',
                requestBody
            );
            console.log(response);
            setData(response);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setRegistrationLoading(false);
        }
    };

    return (
        <div className={styles.center_screen}>

            <Container className={styles.center_screen}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper elevation={3} className={styles.form_container}>
                            <form>
                                <h3 className={styles.form_title}>Registration Form</h3>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    name="name"
                                    placeholder="For ex. John Doe"
                                    onChange={handleRequestBodyChange}
                                    required
                                    className={styles.form_input}
                                    autoComplete="off"
                                />

                                <TextField
                                    fullWidth
                                    label="Email address"
                                    variant="outlined"
                                    type="email"
                                    name="email_id"
                                    placeholder="For example: mburrannagar@binghamton.edu"
                                    onChange={handleRequestBodyChange}
                                    required
                                    className={styles.form_input}
                                    autoComplete="off"
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    onChange={handleRequestBodyChange}
                                    required
                                    className={styles.form_input}
                                    autoComplete="off"
                                />

                                <RadioGroup
                                    row
                                    aria-label="userType"
                                    name="userType"
                                    value={is_teacher ? 'Teacher' : 'Student'}
                                    onChange={handleRadioChange}
                                    className={styles.radio_group}
                                    autoComplete="off"
                                >
                                    <FormControlLabel
                                        value="Student"
                                        control={<Radio color="primary" />}
                                        label="Student"
                                        className={styles.radio_item}
                                    />
                                    <FormControlLabel
                                        value="Teacher"
                                        control={<Radio color="primary" />}
                                        label="Teacher"
                                        className={styles.radio_item}
                                    />
                                </RadioGroup>

                                {is_teacher ? (
                                    <TeacherRegistrationForm
                                        setRequestBody={setRequestBody}
                                        requestBody={requestBody}
                                    />
                                ) : (
                                    <StudentRegistrationForm
                                        setRequestBody={setRequestBody}
                                        requestBody={requestBody}
                                    />
                                )}

                                <div className={styles.submit_button}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={handleSubmission}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div style={{ textAlign: 'center',margin: '10px' }}>
                                    <NavLink to="/login">Already Registerd? Login Here</NavLink>
                                </div>
                            </form>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}

export default UserRegistration;
