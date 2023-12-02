import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { useLocation } from 'react-router';

const ClassStatistics = () => {

    // useLocation hook gives access to the current location (including state)
    const location = useLocation();

    const { state } = location;
    console.log(state, '= state');

    const { course_id } = state;

    const [stats, setStats] = useState(null);
    const [err, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const end_point = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/teacher/statsview/${course_id}/`;

                const response = await axios.get(end_point);

                console.log(response.data);

                setStats(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchStats();
    }, [course_id]);

    if (err) {
        return <>Error: {err.message}</>;
    }

    if (!stats) {
        return <>Loading...</>;
    }

    const {
        no_of_students_registered,
        no_of_students_attempted_quiz,
        no_of_students_left,
        mean_score,
        median_score,
        mode_score,
        top_5_scores,
        bottom_5_scores,
    } = stats;

    const aggregateData = {
        labels: ['Mean Score', 'Median Score', 'Mode Score'],
        datasets: [
            {
                label: 'Aggregate Scores',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                ],
                hoverBorderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                data: [mean_score, median_score, mode_score],
            },
        ],
    };

    const highLowData = {
        labels: ['Highest Score', 'Lowest Score'],
        datasets: [
            {
                label: 'High and Low Scores',
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                hoverBorderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                data: [top_5_scores[0]?.score, bottom_5_scores[0]?.score],
            },
        ],
    };

    return (
        <div style={{ padding: '1rem' }}>
            <Container>
                Class Statistics
            </Container>

            <Grid container spacing={3}>
                {/* General Statistics Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">General Statistics</Typography>
                            <Typography>No. of Students Registered: {no_of_students_registered}</Typography>
                            <Typography>No. of Students Attempted Quiz: {no_of_students_attempted_quiz}</Typography>
                            <Typography>No. of Students Left: {no_of_students_left}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Aggregate Scores Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Aggregate Scores</Typography>
                            <Doughnut data={aggregateData} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* High and Low Scores Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">High and Low Scores</Typography>
                            <Bar
                                data={highLowData}
                                options={{
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        }],
                                    },
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top 5 Scores Card */}
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Top 5 Scores</Typography>
                            <ul>
                                {top_5_scores.map((score, index) => (
                                    <li key={index}>
                                        Student ID: {score.student_id}, Score: {score.score}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bottom 5 Scores Card */}
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Bottom 5 Scores</Typography>
                            <ul>
                                {bottom_5_scores.map((score, index) => (
                                    <li key={index}>
                                        Student ID: {score.student_id}, Score: {score.score}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default ClassStatistics;
