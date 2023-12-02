import { useState, useEffect } from 'react';
import axios from 'axios';

function StudentRegistrationForm(props) {

    const { setRequestBody, requestBody } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/courses/`);
                setData(response.data)
            } catch (err) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, []);


    function handleSubjects(event) {
        const teacher_id = event.target.name;
        const course_code = event.target.value;

        if (event.target.checked) {
            if (!requestBody.courses_list) requestBody.courses_list = []
            // checking if the courses were already added by user
            if (!requestBody.courses_list.includes({ course_code, teacher_id })) {
                requestBody.courses_list.push({
                    course_code, teacher_id
                })
            }
            setRequestBody(requestBody)
            
        } else {

            if (!requestBody.courses_list) requestBody.courses_list = []
            
            // remove the course 
            requestBody.courses_list = requestBody.courses_list.filter(course => !(course.course_code === course_code && course.teacher_id == teacher_id));
            
            setRequestBody(requestBody)
        }

    }

    // loader 
    if (isLoading) {
        return 'Loading'
    }

    // if errors
    if (error) {
        return (
            <div className='alert alert-danger'>
                {error}
            </div>)
    }
    if (data) {
        // when data ready to be displayed
        // if the lenght of courses array is 0 means there still no courses created by professors
        if (data.length == 0) {
            return <>No Courses available to register!</>
        }
        else {
            return data.map((e, index) => {
                return (
                    <div key={index}>
                        <input autoComplete="off" type="checkbox" name={e.teachers__teacher_id} value={e.course_code} onChange={handleSubjects} />
                        <label htmlFor={e.course_name}> {`${e.course_code} - ${e.course_name} - ${e.teachers__name}`.toUpperCase()}</label>
                    </div>
                );
            })

        }
    }


}

export default StudentRegistrationForm;