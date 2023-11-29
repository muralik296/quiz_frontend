import { useState } from "react";
import { Card, Row, Col, NavLink } from "react-bootstrap";
import CreateQuiz from "./CreateQuiz";
import ManageQuiz from "./ManageQuiz";

function TeacherView(props) {

    const [quiz, setQuiz] = useState(null)

    function handleCourseClickTeacher(clickedCourse) {
        console.log(clickedCourse)
    }

    function handleQuiz(clickedCourse) {
        const isQuiz = (clickedCourse.quizzes_info.length > 0) ? true : false;

        if (isQuiz) {
            // Edit Quiz Component needs to be rendered
            setQuiz({
                course: clickedCourse,
                is_edit: true
            })
        }
        else {
            //create quiz component will be rendered
            setQuiz({
                course: clickedCourse,
                is_edit: false
            })
        }

    }

    const { data } = props;
    console.log(data, '=from props')
    const { courses_info } = data;

    if (quiz) {
        // if quiz is true and editing quiz is false, render create quiz component
        if (!quiz.is_edit) {
            // if is_edit is false
            return (<CreateQuiz quiz={quiz} />)
        }
        if (quiz.is_edit) {
            // is is_edit is true
            return (<ManageQuiz quiz={quiz} />)
        }
    }

    return (
        <Row className="mt-3">
            {courses_info.map((eachCourse, index) => (
                <Col key={index} md={4} className="mb-3">
                    <Card onClick={() => handleCourseClickTeacher(eachCourse)}>
                        <Card.Body>
                            <Card.Title>{eachCourse.course_name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Course Code: {eachCourse.course_code}
                            </Card.Subtitle>
                            <Card.Subtitle>
                                <button className="btn btn-outline-secondary" onClick={() => handleQuiz(eachCourse)}>
                                    {(eachCourse.quizzes_info.length > 0) ? 'Manage Quiz' : 'Create Quiz'}
                                </button>
                                {(eachCourse.quizzes_info.length > 0) ? <button className="btn btn-alert">Delete Quiz</button> : null}
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default TeacherView;