import styles from './form.module.css';
import { useState } from 'react';
import StudentRegistrationForm from './StudentRegistration';
import TeacherRegistrationForm from './TeacherRegistration';
import axios from 'axios';


function UserRegistration() {

    // state for registration page loader
    const [isRegistrationLoading, setRegistrationLoading] = useState(false);

    // state for data
    const [data, setData] = useState(null)

    // state for whether is_teacher - radio
    const [is_teacher, setUser] = useState(false)

    // request body changes
    const [requestBody, setRequestBody] = useState({ is_teacher: false })

    function handleRadioChange(event) {
        setUser((prev) => !prev);
        const { value } = event.target;

        setRequestBody((prev) => ({
            ...prev,
            ["is_teacher"]: value == 'Teacher' ? true : false,
        }));
    }

    function handleRequestBodyChange(event) {
        const { name, value } = event.target;

        setRequestBody((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmission(event) {
        setRegistrationLoading(true)

        const response = await axios.post('http://localhost:8000/quiz/registration/', requestBody);
        console.log(response)
        setData(response)

    }

    if (data) {
        return (
            <p>Your responses have been successfuly submitted.
                You may login using the <a to='/login'>Login</a>
            </p>
        )
    }

    if (isRegistrationLoading) return (
        <>Submitting your responses..</>
    )


    return (
        <>
            <div className={styles.center_div}>
                <div className={`w-50 ${styles.form_container}`}>
                    <div className={styles.form_title}>
                        <strong>Registration Form</strong>
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="name" className={styles.form_label}>Name</label>
                        <input onChange={handleRequestBodyChange} type="text" name="name" className={`form-control form-control-sm ${styles.form_input}`} placeholder="For ex. John Doe" required />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="email" className={styles.form_label}>Email address</label>
                        <input onChange={handleRequestBodyChange} type="email" name="email_id" className={`form-control form-control-sm ${styles.form_input}`} placeholder="For example: mburrannagar@binghamton.edu" required />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="password" className={styles.form_label}>Password</label>
                        <input onChange={handleRequestBodyChange} type="password" name="password" className={`form-control form-control-sm ${styles.form_input}`} required />
                    </div>

                    <div className={styles.form_group}>
                        <div className={styles.radio_group}>
                            <label>Are you a <strong>Student</strong> or <strong>Teacher</strong>?</label>
                            <div className={`form-check form-check-inline ${styles.radio_item}`}>
                                <input onChange={handleRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Student" required defaultChecked />
                                <label className={`form-check-label ${styles.radio_label}`} htmlFor="inlineRadio1">Student</label>
                            </div>
                            <div className={`form-check form-check-inline ${styles.radio_item}`}>
                                <input onChange={handleRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Teacher" required />
                                <label className={`form-check-label ${styles.radio_label}`} htmlFor="inlineRadio2">Teacher</label>
                            </div>
                        </div>
                    </div>

                    {is_teacher ? <TeacherRegistrationForm setRequestBody={setRequestBody} requestBody={requestBody} /> : <StudentRegistrationForm setRequestBody={setRequestBody} requestBody={requestBody} />}

                    <div className={styles.submit_button}>
                        <button className={`btn btn-outline-primary ${styles.submit_button}`} type="submit" onClick={handleSubmission}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRegistration;