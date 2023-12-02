import React, { useState, useRef,useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Container, Checkbox, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import QuizSubmit from '../SuccessQuizSubmit';
import QuizTimer from '../QuizTimer/index';

const formatTime = (time) => (time < 10 ? `0${time}` : time);

function ShowQuiz(props) {
    const { quizData, student_id } = props;
    const { quizInfo, subject } = quizData;
    const [finalSubmission, setFinalSubmission] = useState(null);
    const { course_id, course_name, quizzes_info } = subject;
    const { start_date, start_time, duration } = quizzes_info[0];
    const { questions } = quizInfo;

    const myForm = useRef(null);




    const [remainingTime, setRemainingTime] = useState({
        hours: Math.floor(duration / 60),
        minutes: duration % 60,
        seconds: 0,
    });

    console.log(remainingTime, '=remaining time');


    useEffect(() => {
        if (remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
            submitQuiz(); // Trigger quiz submission when time is up
        }
    }, [remainingTime]);

    // const handleAnswerChange = (questionIndex, optionIndex) => {
    //     const questionName = questions[questionIndex]?.question;
    //     const answerChosen = questions[questionIndex]?.options[optionIndex];
    //     const type = questions[questionIndex]?.type;

    //     setAnswers((prevAnswers) => {
    //         const updatedAnswers = [...prevAnswers];
    //         const existingAnswerIndex = updatedAnswers.findIndex((ans) => ans.question === questionName);

    //         console.log(type,'this is the')
    //         if (existingAnswerIndex !== -1) {
    //             if (type === 'multipleChoice') {
    //                 updatedAnswers[existingAnswerIndex].chosen_option = answerChosen;
    //             } else {
    //                 if (!updatedAnswers[existingAnswerIndex].chosen_option.includes(answerChosen)) {
    //                     updatedAnswers[existingAnswerIndex].chosen_option.push(answerChosen);
    //                 }
    //             }
    //         } else {
    //             if (type === 'multipleChoice') {
    //                 updatedAnswers.push({
    //                     question: questionName,
    //                     chosen_option: answerChosen,
    //                 });
    //             } else {
    //                 updatedAnswers.push({
    //                     question: questionName,
    //                     chosen_option: [answerChosen],
    //                 });
    //             }
    //         }

    //         return updatedAnswers;
    //     });
    // };

    const handleAnswerChange = (questionIndex, optionIndex) => {
        const question = questions[questionIndex];
        const selectedOption = question.options[optionIndex];
        const updatedAnswers = [...answers];
    
        const existingAnswerIndex = updatedAnswers.findIndex(ans => ans.question === question.question);
    
        if (existingAnswerIndex !== -1) {
            if (question.type === 'multipleChoice') {
                updatedAnswers[existingAnswerIndex].chosen_option = selectedOption;
            } else {
                const foundIndex = updatedAnswers[existingAnswerIndex].chosen_option.indexOf(selectedOption);
                if (foundIndex !== -1) {
                    updatedAnswers[existingAnswerIndex].chosen_option.splice(foundIndex, 1);
                } else {
                    updatedAnswers[existingAnswerIndex].chosen_option.push(selectedOption);
                }
            }
        } else {
            if (question.type === 'multipleChoice') {
                updatedAnswers.push({
                    question: question.question,
                    chosen_option: selectedOption,
                });
            } else {
                updatedAnswers.push({
                    question: question.question,
                    chosen_option: [selectedOption],
                });
            }
        }
    
        setAnswers(updatedAnswers);
    };
    

    const submitQuiz = async () => {
        try {
            const requestBody = { answers: answers.flat() };
            const endpoint = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/student/${course_id}/${student_id}/answers/`;
            const res = await axios.post(endpoint, requestBody);
            console.log('Quiz submitted:', res.data);
            setFinalSubmission({ data: res.data, flag: true });
        } catch (err) {
            setFinalSubmission({ flag: false, data: err });
            console.log('Error submitting quiz:', err);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const requestBody = { answers: answers.flat() };
            console.log(requestBody, '= final request to send');
            const endpoint = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/quiz/student/${course_id}/${student_id}/answers/`;

            const res = await axios.post(endpoint, requestBody);

            console.log(res.data);
            setFinalSubmission({ data: res.data, flag: true });
        } catch (err) {
            setFinalSubmission({ flag: false, data: err });
            console.log(err);
        }
    };

    const [answers, setAnswers] = useState([]);

    // const renderInput = (questionIndex, optionIndex) => {
    //     const inputType = questions[questionIndex]?.type === 'multipleChoice' ? 'radio' : 'checkbox';

    //     return (
    //         <FormControlLabel
    //             key={optionIndex}
    //             control={<Checkbox />}
    //             label={questions[questionIndex]?.options[optionIndex]}
    //             onChange={() => handleAnswerChange(questionIndex, optionIndex)}
    //         />
    //     );
    // };
    // const renderInput = (questionIndex, optionIndex) => {
    //     const type = questions[questionIndex]?.type;
    //     const isSelected = questions[questionIndex]?.options[optionIndex] === questions[questionIndex]?.chosen_option;
    
    //     return (
    //         <FormControlLabel
    //             key={optionIndex}
    //             control={
    //                 type === 'multipleChoice' ? (
    //                     <Radio
    //                         checked={isSelected}
    //                         onChange={() => handleAnswerChange(questionIndex, optionIndex)}
    //                     />
    //                 ) : (
    //                     <Checkbox
    //                         checked={isSelected}
    //                         onChange={() => handleAnswerChange(questionIndex, optionIndex)}
    //                     />
    //                 )
    //             }
    //             label={questions[questionIndex]?.options[optionIndex]}
    //         />
    //     );
    // };
    const renderInput = (questionIndex, optionIndex) => {
        const question = questions[questionIndex];
        const type = question.type;
        const selectedOption = question.options[optionIndex];
        let isSelected = false;
    
        const foundAnswer = answers.find(ans => ans.question === question.question);
    
        if (foundAnswer) {
            isSelected = type === 'multipleChoice'
                ? foundAnswer.chosen_option === selectedOption
                : foundAnswer.chosen_option.includes(selectedOption);
        }
    
        return (
            <FormControlLabel
                key={optionIndex}
                control={
                    type === 'multipleChoice' ? (
                        <Radio
                            checked={isSelected}
                            onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                        />
                    ) : (
                        <Checkbox
                            checked={isSelected}
                            onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                        />
                    )
                }
                label={selectedOption}
            />
        );
    };
    
    if (finalSubmission?.flag) {
        return <QuizSubmit finalSubmission={finalSubmission} />;
    }

    if (remainingTime?.hours === 0 && remainingTime?.minutes === 0 && remainingTime?.seconds === 0) {
        return (
            <div className='container-fluid alert alert-danger'>
                Time's up!
            </div>
        );
    }

    return (
        <Grid container style={{ marginTop: '1rem' }}>
            <Grid item xs={12}>
                <Container>
                    <Typography variant="h6" gutterBottom>
                        Quiz for {course_name}
                    </Typography>
                </Container>

                <QuizTimer startTime={`${start_date} ${start_time}`} duration={duration} remainingTime={remainingTime} setRemainingTime={setRemainingTime} courseId={course_id} studentId={student_id} quizdata={{ answers: answers.flat() }}/>
                <Container>
                    {finalSubmission?.flag === false && (
                        <div style={{ marginTop: '1rem', marginBottom: '1rem' }} className='alert alert-danger'>
                            Error Occurred while trying to submit your responses
                        </div>
                    )}

                    {questions.map((question, questionIndex) => (
                        <Card key={questionIndex} style={{ marginBottom: '1rem' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ marginBottom: '0.5rem' }}>
                                    {question.question}
                                </Typography>
                                <div>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            {renderInput(questionIndex, optionIndex)}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <form ref={myForm} onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Container>
            </Grid>
        </Grid>
    );
}

export default ShowQuiz;
