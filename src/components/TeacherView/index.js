import React, { useState, useContext, useEffect } from 'react';
import { Card, Grid, Button, Typography } from '@mui/material';
import axios from 'axios';
import Header from '../Header';
import ClassStatistics from './Stats';
import { AccountContext } from '../../Store/AccountContext';
import { useNavigate } from 'react-router-dom';

function TeacherView() {
  const navigate = useNavigate();

  // account information from account context
  const { data, setData, userInfo, is_teacher } = useContext(AccountContext);

  const [quiz, setQuiz] = useState(null);

  const { courses_info, teacher_info } = data;

  const { teacher_id, name, email_id } = teacher_info;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const end_point = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/login/`;

        const response = await axios.post(
          end_point,
          {
            email_id: userInfo.email_id,
            password: userInfo.password,
            is_teacher,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleStats(data) {
    const { courses_info, teacher_info } = data;
    const { course_id } = courses_info[0];

    return navigate('/classStats', { state: { course_id } });
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
          teacher_id,
        },
      });
      const result = response.data;
      delete result['message'];

      // changing the original data so that it renders with the updated dataset
      setData(result);
    } catch (err) {
      console.error(err);
    }
  }

  function handleQuiz(clickedCourse) {
    const isQuiz = clickedCourse.quizzes_info.length > 0;

    if (isQuiz) {
      // Edit Quiz Component needs to be rendered
      return navigate('/manageQuiz', { state: { clickedCourse } });
    } else {
      console.log('here at create');
      // Create quiz component will be rendered
      return navigate('/createQuiz', { state: { clickedCourse } });
    }
  }

  return (<div style={{ padding: '1rem' }}>
    {/* <Header name={name} email_id={email_id} is_student={false} /> */}

    <Grid container spacing={3}>
      {courses_info.map((eachCourse, index) => (
        <Grid key={index} item xs={12} md={4}>
          <Card style={{ borderRadius: '15px', backgroundColor: '#fff' }}>
            <Grid container direction="column" spacing={2} style={{ padding: '1rem' }}>
              <Grid item>
                <Typography variant="h6">{eachCourse.course_name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  Course Code: {eachCourse.course_code}
                </Typography>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuiz(eachCourse)}
                    fullWidth
                  >
                    {eachCourse.quizzes_info.length > 0 ? 'Manage Quiz' : 'Create Quiz'}
                  </Button>
                </Grid>
                {eachCourse.quizzes_info.length > 0 && (
                  <>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(data)}
                      >
                        Delete Quiz
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStats(data)}
                      >
                        View Stats
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>)
}

export default TeacherView;
