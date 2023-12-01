import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import CreateQuiz from './CreateQuiz';
import ManageQuiz from './ManageQuiz';
import axios from 'axios';
import Header from '../Header';
import ClassStatistics from './Stats';

function TeacherView(props) {

  const [quiz, setQuiz] = useState(null);

  const { data, handleData } = props;
  const { courses_info, teacher_info } = data;

  const { teacher_id, name, email_id } = teacher_info;

  const [isStats, setIsStats] = useState(false);

  function handleStats(data) {
    const { courses_info, teacher_info } = data;
    const { course_id } = courses_info[0];

    setIsStats({
      isStats: true,
      course_id
    })

  }


  async function handleDelete(data) {
    const { courses_info, teacher_info } = data;
    const { course_id } = courses_info[0];
    const { teacher_id } = teacher_info;

    const end_point = `http://127.0.0.1:8000/quiz/delete/${course_id}/${teacher_id}`;

    try {
      const response = await axios.delete(end_point, {
        data: {
          course_id,
          teacher_id
        },
      });
      const result = response.data;
      delete result['message'];

      // changing the original data so that it renders with updated dataset
      handleData(data);

      console.log(data, ' = after update');

    } catch (err) {
      console.error(err);
    }
  }

  function handleCourseClickTeacher(clickedCourse) {
    console.log(clickedCourse);
  }

  function handleQuiz(clickedCourse) {
    const isQuiz = clickedCourse.quizzes_info.length > 0;

    if (isQuiz) {
      // Edit Quiz Component needs to be rendered
      setQuiz({
        course: clickedCourse,
        is_edit: true,
      });
    } else {
      // Create quiz component will be rendered
      setQuiz({
        course: clickedCourse,
        is_edit: false,
      });
    }
  }


  if (isStats?.isStats) {
    return (
      <ClassStatistics course_id={isStats?.course_id} />
    )
  }

  if (quiz) {
    if (!quiz.is_edit) {
      return <CreateQuiz data={data} quiz={quiz} />;
    }
    if (quiz.is_edit) {

      return <ManageQuiz data={data} quiz={quiz} />;
    }
  }

  return (
    <div className='container-fluid'>
      <Header name={name} email_id={email_id} is_student={false} />

      <Row className="mt-3">
        {courses_info.map((eachCourse, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card onClick={() => handleCourseClickTeacher(eachCourse)} style={{ margin: '15px' }}>
              <Card.Body>
                <Card.Title>{eachCourse.course_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Course Code: {eachCourse.course_code}
                </Card.Subtitle>
                <Card.Subtitle>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuiz(eachCourse)}
                  >
                    {eachCourse.quizzes_info.length > 0
                      ? 'Manage Quiz'
                      : 'Create Quiz'}
                  </Button>

                  {eachCourse.quizzes_info.length > 0 ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(data)}
                    >
                      Delete Quiz
                    </Button>
                  ) : null}

                  {eachCourse.quizzes_info.length > 0 ? (
                    <Button
                      variant="primary"
                      onClick={() => handleStats(data)}
                    >
                      View Stats
                    </Button>
                  ) : null}

                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TeacherView;
