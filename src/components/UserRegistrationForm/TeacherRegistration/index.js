import { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './styles.module.css';
import { TextField } from '@mui/material';

function TeacherRegistrationForm(props) {
    const { requestBody, setRequestBody } = props;

    // first it will be a single input box
    const [numberOfInputs, setNumberOfInputs] = useState(1);

    const handleNumberOfInputs = () => {
        const course_name = document.querySelector(`input[name=course_name_${numberOfInputs}]`).value;
        const course_code = document.querySelector(`input[name=course_code_${numberOfInputs}]`).value;

        setRequestBody((prev) => {
            if (!prev.courses_list) prev.courses_list = []
            prev.courses_list.push({
                course_name, course_code
            })
            return prev
        })
        console.log(requestBody,'= change at teacher form');
        setNumberOfInputs((prev) => prev + 1);
    };

    return (
        <div className={styles.input_group}>
            <p>Please type the course code and name that you would like to teach?</p>
            {[...Array(numberOfInputs)].map((_, index) => (
                <div key={index} className={styles.input_row}>
                    <TextField
                        type="number" name={`course_code_${index + 1}`}  placeholder="Enter Course Code" readOnly={index !== numberOfInputs - 1}
                    />
                    <TextField
                        type="text" name={`course_name_${index + 1}`}  placeholder="Enter Course Name"
                    />
                </div>
            ))}

            <AddCircleIcon onClick={handleNumberOfInputs} />
        </div>
    );
}

export default TeacherRegistrationForm;
