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
                console.log(response.data,'= response');
                setData(response.data)
            } catch (err) {
                console.log(err, '= error')
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

        console.log(teacher_id,'= teacher id')
        console.log(course_code,'= course id')


        if (event.target.checked) {
            if (!requestBody.courses_list) requestBody.courses_list = []
            // checking if the courses were already added by user
            if (!requestBody.courses_list.includes({ course_code, teacher_id })) {
                requestBody.courses_list.push({
                    course_code, teacher_id
                })
            }
            setRequestBody(requestBody)
            
            console.log(requestBody)
        } else {

            if (!requestBody.courses_list) requestBody.courses_list = []
            
            // remove the course 
            requestBody.courses_list = requestBody.courses_list.filter(course => !(course.course_code === course_code && course.teacher_id == teacher_id));
            
            setRequestBody(requestBody)
        }

    }

    // logging the request body
    console.log(requestBody,'= request body')

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
                console.log(e, '=element');
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