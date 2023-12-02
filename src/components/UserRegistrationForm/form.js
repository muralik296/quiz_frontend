import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import styles from './form.module.css';
import TeacherRegistrationForm from "./TeacherRegistration";
import StudentRegistrationForm from "./StudentRegistration";
import { NavLink } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// duplicate course code return true or false
function hasDuplicateCourseCode(coursesList) {
    const courseCodeSet = new Set();

    for (const course of coursesList) {
        if (courseCodeSet.has(course.course_code)) {
            return true;
        }
        courseCodeSet.add(course.course_code);
    }

    return false; // No duplicate course code found
}


function UserRegistration() {
    const [data, setData] = useState(null);
    const [is_teacher, setUser] = useState(false);
    const [requestBody, setRequestBody] = useState({ is_teacher: false });
    const [isError, setError] = useState(false);
    const [isUiError, setuiError] = useState(false);

    const handleRadioChange = (event) => {
        setUser((prev) => !prev);
        const { value } = event.target;

        setRequestBody((prev) => ({
            ...prev,
            ["is_teacher"]: value == 'Teacher' ? true : false,
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

        try {
            const { courses_list } = requestBody;
            // flag which checks if more than one course share same course code

            // handling if the user has not registered for a course.
            if (!courses_list || courses_list.length == 0) {
                setuiError('Please register for a course before continuing!');
                return setTimeout(() => {
                    setuiError(false);
                }, 4000)
            }

            const isSameCourseCode = hasDuplicateCourseCode(courses_list);



            if (isSameCourseCode) {
                setuiError('You cannot register for the same course twice!');
                return setTimeout(() => {
                    setuiError(false);
                }, 4000)
            }

            const response = await axios.post(
                `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/registration/`,
                requestBody
            );
            setData(response);
            // to do: 

            setRequestBody({ email_id: '', password: '', is_teacher: false, name: '' });
            setTimeout(() => {
                setData(null);
            }, 2000)
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error)
            setTimeout(() => {
                setError(false);
            }, 4000)
        }
    };

    return (
        <div className={styles.center_screen}>

            <Container className={styles.center_screen}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper elevation={3} className={styles.form_container}>
                            {data ? (<div className='alert alert-success'>Successfully Registered!</div>) : null}
                            {isError ? <div className='alert alert-danger'>{isError?.message}</div> : null}
                            {isUiError ? <div className='alert alert-danger'>{isUiError}</div> : null}

                            <form>
                                <h3 className={styles.form_title}>Register with us! <AppRegistrationIcon /></h3>
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
                                    value={requestBody.name}
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
                                    value={requestBody.email_id}
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
                                    value={requestBody.password}
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
                                <div className={styles.login_link} style={{ textAlign: 'center', margin: '10px' }}>
                                    <NavLink to="/login">Existing User? Login Here</NavLink>
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
