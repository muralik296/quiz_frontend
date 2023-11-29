import { useState } from 'react';
import QuizTimer from '../QuizTimer';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// function calculateRemainingTime(startTime, duration) {
//     // Parse start time
//     const [time, amPm] = startTime.split(' ');
//     const [startHour, startMinute] = time.split(':').map(Number);

//     // Adjust for AM/PM
//     const adjustedStartHour = amPm === 'PM' && startHour !== 12 ? startHour + 12 : startHour;

//     // Convert start time and duration to total minutes
//     const startTimeInMinutes = adjustedStartHour * 60 + startMinute;
//     const endTimeInMinutes = startTimeInMinutes + duration;

//     // Get current time and convert to total minutes
//     const currentTime = new Date();
//     const currentHour = currentTime.getHours();
//     const currentMinute = currentTime.getMinutes();
//     const currentTimeInMinutes = currentHour * 60 + currentMinute;

//     // Check if the current time is within the eligible range
//     const isEligible = currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;

//     // Calculate remaining time
//     const remainingTime = isEligible ? endTimeInMinutes - currentTimeInMinutes : 0;

//     return { isEligible, remainingTime };

// }

// function ShowQuiz(props) {


//     return (
//         <Container>
//             <Form onSubmit={handleSubmit}>
//                 {questions.map((question, questionIndex) => (
//                     <div key={questionIndex}>
//                         <h4>{question.question}</h4>
//                         <Form.Group as={Row}>
//                             {question.options.map((option, optionIndex) => (
//                                 <Col key={optionIndex} xs={12} md={6}>
//                                     {question.options.length > 2 ? (
//                                         <Form.Check
//                                             type="checkbox"
//                                             label={option}
//                                             onChange={() => handleAnswerChange(questionIndex, optionIndex)}
//                                             // checked={answers[questionIndex]?.includes(optionIndex)}
//                                         />
//                                     ) : (
//                                         <Form.Check
//                                             type="radio"
//                                             label={option}
//                                             onChange={() => handleAnswerChange(questionIndex, optionIndex)}
//                                             // checked={answers[questionIndex]?.[0] === optionIndex}
//                                         />
//                                     )}
//                                 </Col>
//                             ))}
//                         </Form.Group>
//                     </div>
//                 ))}
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </Container>
//     );

// }



// ... (imports)

function ShowQuiz(props) {
    
    const { quizData } = props;
    const { quizInfo, subject } = quizData;
    console.log(quizInfo, '= quiz info');
    console.log(subject, '=subject');
    const { course_id, course_name, quizzes_info } = subject;
    const { start_date, start_time, duration } = quizzes_info[0];
    const { questions } = quizInfo;
    console.log(questions, '=questions');

    const handleAnswerChange = (questionIndex, optionIndex) => {
        console.log(questionIndex, '= question index');
        console.log(optionIndex, '= option index');

        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            if (!updatedAnswers[questionIndex]) {
                updatedAnswers[questionIndex] = [];
            }

            const isOptionSelected = updatedAnswers[questionIndex].includes(optionIndex);
            if (isOptionSelected) {
                // Remove the option if already selected
                updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter((index) => index !== optionIndex);
            } else {
                // Add the option if not selected
                updatedAnswers[questionIndex].push(optionIndex);
            }

            return updatedAnswers;
        });
        console.log(answers, '= answers ');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Flatten the array of answers before submitting
        const allAnswers = answers.flat();
        console.log('All Answers:', allAnswers);
        // You can now send 'allAnswers' to the backend or perform any other desired actions
    };

    const [answers, setAnswers] = useState([]);

    const renderInput = (questionIndex, optionIndex) => {
        const answer = questions[questionIndex].answer;
        const isMultiAnswer = answer && answer.length > 1;

        if (isMultiAnswer) {
            return (
                <Form.Check
                    key={optionIndex}
                    type="checkbox"
                    label={questions[questionIndex].options[optionIndex]}
                    onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                // checked={answers[questionIndex]?.includes(optionIndex)}
                />
            );
        } else {
            return (
                <Form.Check
                    key={optionIndex}
                    type="radio"
                    label={questions[questionIndex].options[optionIndex]}
                    onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                    // checked={answers[questionIndex]?.[0] === optionIndex}
                    name={`question-${questionIndex}`} // Ensure radio buttons share the same name for single-select
                />
            );
        }
    };

    return (
        <>
            <h4>Quiz for {course_name}</h4>
            <Container>
                <Form onSubmit={handleSubmit}>
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex}>
                            <h4>{question.question}</h4>
                            <Form.Group as={Row}>
                                {question.options.map((option, optionIndex) => (
                                    <Col key={optionIndex} xs={12} md={6}>
                                        {renderInput(questionIndex, optionIndex)}
                                    </Col>
                                ))}
                            </Form.Group>
                        </div>
                    ))}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>

    );
}

// export default ShowQuiz;

export default ShowQuiz;