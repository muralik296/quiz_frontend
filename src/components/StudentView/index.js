import { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ShowQuiz from './ShowQuiz';
import Header from '../Header';


// helper function
function checkEligibility(startTime, startDate, duration) {
    // Get current date and time
    const now = new Date();

    // Format the provided start date to match the current date format
    const [year, month, day] = startDate.split('-');
    const startDateTime = new Date(year, month - 1, day);

    // Get the hours, minutes, and period (AM/PM) from the start time
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':');

    // Convert hours to 24-hour format for correct comparison
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    }
    startDateTime.setHours(hour, minutes);

    // Calculate end time by adding duration minutes to the start time
    const endTime = new Date(startDateTime.getTime() + duration * 60000);

    // Check if the current time falls within the time range
    return now >= startDateTime && now <= endTime;
}

const StudentView = (props) => {
    console.log(props, '= props in student view')
    const { data } = props;

    const [quizData, setQuizData] = useState(null);

    const { student_info, courses_info } = data;
    console.log(student_info, '= student infor');
    const { student_id, name, email_id } = student_info;

    function renderShowQuizes(subject, index) {
        const { course_code, course_name, quizzes_info } = subject;
        console.log(quizzes_info)

        if (quizzes_info.length == 0) {
            return (< Card key={index} className="mb-4" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>{course_name}</Card.Title>
                    <Card.Text className="text-danger">{`No quizzes available for ${course_name}`}</Card.Text>
                </Card.Body>
            </Card >)
        }

        const { start_date, start_time, duration } = quizzes_info[0];
        
        
        const isEligible = checkEligibility(start_time, start_date, duration);
        
        console.log(isEligible);
        
        return (

            < Card key={index} style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>{course_name}</Card.Title>

                    <Card.Text>Duration: {duration} minutes</Card.Text>

                    <Button
                        // disabled={!isQuizTimeValid(start_date, start_time, duration)}
                        title={`Quiz starts at ${formatTime(new Date(quizzes_info[0]?.start_date))}`}
                        onClick={(e) => handleQuiz(subject)}
                    >
                        Take Quiz
                    </Button>
                </Card.Body>
            </Card >
        )
    }

    async function handleQuiz(subject) {
        try {
            console.log(subject);
            const { course_id, course_name, quizzes_info } = subject;
            console.log(course_id)
            console.log(course_name)
            // console.log()
            const { start_date, start_time, duration } = quizzes_info[0];

            const end_point = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/student/${course_id}/questions`;

            const response = await axios.get(end_point)

            console.log(response.data);

            setQuizData({ quizInfo: response.data, subject: subject });

        } catch (err) {
            console.log(err);
        }
    }


    // Function to format time
    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (quizData) {
        return <ShowQuiz quizData={quizData} student_id={student_id} />
    }

    return (
        <div className='container-fluid'>
            <Header name={name} email_id={email_id} is_student={true} />
            <Row className="mt-3">
                {courses_info.map((subject, index) => {

                    return (
                        <Col key={index} md={4} className="mb-3">
                            {renderShowQuizes(subject, index)}
                        </Col>
                    );

                })}
            </Row>
        </div>
    );
};

export default StudentView;
