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

            <div className={`${styles.center_div}`}>

                <div className="w-50">
                    <div>
                        <strong>User Registration Form</strong>
                    </div>
                    <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onChange={handleRequestBodyChange} type="text" name="name" className="form-control form-control-sm" placeholder="For ex. John Doe" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={handleRequestBodyChange} type="email" name="email_id" className="form-control form-control-sm" placeholder="For example: mburrannagar@binghamton.edu" required />
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={handleRequestBodyChange} type="password" name="password" className="form-control form-control-sm" required />
                    </div>


                    <div>
                        <div>
                            <label>Are you a <strong>Student</strong> or <strong>Teacher</strong>?</label>

                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={handleRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Student" required defaultChecked />
                            <label className="form-check-label" htmlFor="inlineRadio1">Student</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={handleRadioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Teacher" required />
                            <label className="form-check-label" htmlFor="inlineRadio2">Teacher</label>
                        </div>
                    </div>
                    {is_teacher ? <TeacherRegistrationForm setRequestBody={setRequestBody} requestBody={requestBody} /> : <StudentRegistrationForm setRequestBody={setRequestBody} requestBody={requestBody} />}
                    <div>
                        <button className="btn btn-outline-primary" type="submit" onClick={handleSubmission}>Submit</button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default UserRegistration;