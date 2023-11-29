// CreateQuiz.js

import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

const CreateQuiz = () => {
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);
    const [questions, setQuestions] = useState([]);

    const handleQuestionSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const numberOfChoices = formData.get('numberOfChoices');
        const questionTypeIndex = formData.get('questionTypeIndex');
        const newQuestion = {
            type: formData.get(`questionType${questionTypeIndex}`),
            question: formData.get('question'),
            numberOfChoices,
            options: Array.from({ length: numberOfChoices }, (_, i) => formData.get(`option${questionTypeIndex}_${i + 1}`)),
            correctAnswer: formData.get(`correctAnswer${questionTypeIndex}`),
        };

        setQuestions([...questions, newQuestion]);
        event.target.reset();
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault()
        // Format quiz data for backend
        const quizContent = questions.map((question) => ({
            question: question.question,
            options: question.options,
            correct_answer: question.correctAnswer,
        }));


        const quizData = {
            teacher_id: 8, // Replace with the actual teacher ID
            course_id: 15, // Replace with the actual course ID
            quiz_content: quizContent,
            start_time: startTime,
            start_date: startDate, // Use the selected start date
            duration: `${duration} hour`, // Assuming duration is in hours
        };

        // Send quizData to the backend API
        console.log(quizData)
        // You can use fetch or any other method to send data to the backend
    };

    const renderCorrectAnswerField = (questionIndex, numberOfChoices, questionType) => {
        if (questionType === 'multipleChoice') {
            return (
                <Form.Control as="select" name={`correctAnswer${questionIndex + 1}`} required>
                    {[...Array(Number(numberOfChoices))].map((_, index) => (
                        <option key={index} value={`option${questionIndex + 1}_${index + 1}`}>
                            Option {index + 1}
                        </option>
                    ))}
                </Form.Control>
            );
        } else if (questionType === 'multipleAnswer') {
            return <Form.Control type="text" placeholder={`Enter correct answer`} name={`correctAnswer${questionIndex + 1}`} required />;
        }

        return null;
    };

    const renderQuestionForm = () => {
        const questionCards = [];

        for (let i = 0; i < numberOfQuestions; i++) {
            const numberOfChoices = questions[i]?.numberOfChoices || 2;
            const questionType = questions[i]?.type || 'multipleChoice';

            questionCards.push(
                <Card key={i} className="mb-3">
                    <Card.Body>
                        <h5>Question {i + 1}</h5>
                        <Form.Group controlId={`questionType${i + 1}`}>
                            <Form.Label>Type of Question:</Form.Label>
                            <Form.Control
                                as="select"
                                name={`questionType${i + 1}`}
                                onChange={(e) => handleQuestionTypeChange(i, e.target.value)}
                                defaultValue={questionType}
                                required
                            >
                                <option value="multipleChoice">Multiple Choice</option>
                                <option value="multipleAnswer">Multiple Answer</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={`numberOfChoices${i + 1}`}>
                            <Form.Label>Number of Choices:</Form.Label>
                            <Form.Control
                                type="number"
                                min="2"
                                max="4"
                                defaultValue={numberOfChoices}
                                name={`numberOfChoices${i + 1}`}
                                onChange={(e) => handleNumberOfChoicesChange(i, e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId={`question${i + 1}`}>
                            <Form.Label>Question:</Form.Label>
                            <Form.Control type="text" placeholder="Enter the question" name={`question`} required />
                        </Form.Group>
                        {[...Array(Number(numberOfChoices))].map((_, index) => (
                            <Form.Group key={index} controlId={`option${i + 1}_${index + 1}`}>
                                <Form.Label>Option {index + 1}:</Form.Label>
                                <Form.Control type="text" placeholder={`Enter option ${index + 1}`} name={`option${i + 1}_${index + 1}`} required />
                            </Form.Group>
                        ))}
                        <Form.Group controlId={`correctAnswer${i + 1}`}>
                            <Form.Label>Correct Answer:</Form.Label>
                            {renderCorrectAnswerField(i, numberOfChoices, questionType)}
                        </Form.Group>
                    </Card.Body>
                </Card>
            );
        }

        return questionCards;
    };

    const handleQuestionTypeChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            type: value,
        };
        setQuestions(updatedQuestions);
    };

    const handleNumberOfChoicesChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            numberOfChoices: value,
        };
        setQuestions(updatedQuestions);
    };

    return (
        <Container>
            <Form onSubmit={handleQuizSubmit}>
                <Form.Group controlId="startTime">
                    <Form.Label>Start Time:</Form.Label>
                    <Form.Control type="datetime-local" onChange={(e) => setStartTime(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="startDate">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="duration">
                    <Form.Label>Duration (in minutes):</Form.Label>
                    <Form.Control type="number" min="1" onChange={(e) => setDuration(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="numberOfQuestions">
                    <Form.Label>Number of Questions:</Form.Label>
                    <Form.Control type="number"  onChange={(e) => setNumberOfQuestions(e.target.value)} required />
                </Form.Group>

                {renderQuestionForm()}

                <Button variant="primary" type="submit">
                    Create Quiz
                </Button>
            </Form>
        </Container>
    );
};

export default CreateQuiz;
