import React, { useState, useContext } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import axios from 'axios';
import Header from '../Header';
import ClassStatistics from './Stats';
import { AccountContext } from '../../Store/AccountContext';
import { useNavigate } from 'react-router-dom';

function TeacherView() {
  const navigate = useNavigate();

  // account information from account context
  const { data, setData } = useContext(AccountContext);

  const [quiz, setQuiz] = useState(null);

  const { courses_info, teacher_info } = data;

  const { teacher_id, name, email_id } = teacher_info;


  function handleStats(data) {
    const { courses_info, teacher_info } = data;
    const { course_id } = courses_info[0];

    return navigate('/classStats', { state: { course_id } })


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
      setData(data);

      console.log(data, ' = after update');

    } catch (err) {
      console.error(err);
    }
  }

  // function handleCourseClickTeacher(clickedCourse) {
  //   console.log(clickedCourse);
  // }

  function handleQuiz(clickedCourse) {
    const isQuiz = clickedCourse.quizzes_info.length > 0;

    if (isQuiz) {
      // Edit Quiz Component needs to be rendered
      return navigate('/manageQuiz', { state: { clickedCourse } })
    } else {
      console.log('here at create')
      // Create quiz component will be rendered
      return navigate('/createQuiz', { state: { clickedCourse } });
    }
  }


  return (
    <div className='container-fluid'>
      <Header name={name} email_id={email_id} is_student={false} />

      <Row className="mt-3">
        {courses_info.map((eachCourse, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card style={{ margin: '15px' }}>
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
