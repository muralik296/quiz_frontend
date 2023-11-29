import { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ShowQuiz from './ShowQuiz';

const StudentView = (props) => {
    const { data } = props;

    const [quizData, setQuizData] = useState(null);

    const { student_info, courses_info } = data;

    const { student_id } = student_info;

    async function handleQuiz(subject) {
        try {
            const { course_id, course_name, quizzes_info } = subject;
            const { start_date, start_time, duration } = quizzes_info[0];

            const end_point = `http://127.0.0.1:8000/quiz/student/${course_id}/questions/`;

            const response = await axios.get(end_point)
            
            console.log(response.data);

            setQuizData({ quizInfo: response.data, subject: subject });

        } catch (err) {
            console.log(err);
        }
    }

    function isQuizTimeValid(startDate, startTime, duration) {
        // Convert start date and time to a JavaScript Date object
        var startDateObj = new Date(startDate + ' ' + startTime);

        // Calculate the end time in milliseconds
        var endTimeInMillis = startDateObj.getTime() + parseInt(duration) * 60000; // 1 minute = 60000 milliseconds

        // Get the current time
        var currentTime = new Date().getTime();

        // Check if the current time is within the allowed time range
        return currentTime >= startDateObj.getTime() && currentTime <= endTimeInMillis;
    }

    // Function to format time
    const formatTime = (time) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (quizData) {
        return <ShowQuiz quizData={quizData} />
    }

    return (
        <div>
            <h2>Student Dashboard</h2>
            <Row className="mt-3">

                {courses_info.map((subject, index) => {
                    const { course_code, course_name, quizzes_info } = subject;
                    const { start_date, start_time, duration } = quizzes_info[0];
                    console.log(quizzes_info)
                    return (
                        <Col key={index} md={4} className="mb-3">

                            <Card key={index}>
                                <Card.Body>
                                    <Card.Title>{course_name}</Card.Title>

                                    <Card.Text>Duration: {duration} minutes</Card.Text>

                                    <Button
                                        // disabled={!isQuizTimeValid(start_date, start_time, duration)}
                                        title={`Quiz starts at ${formatTime(new Date(start_date))}`}
                                        onClick={(e) => handleQuiz(subject)}
                                    >
                                        Take Quiz
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default StudentView;
