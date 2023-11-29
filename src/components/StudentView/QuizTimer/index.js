// QuizTimer.js
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const QuizTimer = ({ startTime, duration }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    let timeoutId;

    useEffect(() => {
        const parseTime = (time) => {
            const [hoursMinutes, amPm] = time.split(' ');
            const [hours, minutes] = hoursMinutes.split(':').map(Number);
            const adjustedHours = amPm === 'AM' ? hours : hours + 12;
            return adjustedHours * 60 + minutes;
        };

        const startTimeInMinutes = parseTime(startTime);
        const endTimeInMinutes = startTimeInMinutes + duration;

        const updateRemainingTime = () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinute = currentTime.getMinutes();
            const currentTimeInMinutes = currentHour * 60 + currentMinute;

            let remainingTime = endTimeInMinutes - currentTimeInMinutes;

            // Ensure remaining time is non-negative
            remainingTime = Math.max(remainingTime, 0);

            setRemainingTime(remainingTime);

            // Schedule the next update after 1 second
            timeoutId = setTimeout(updateRemainingTime, 1000);
        };

        // Update remaining time initially
        updateRemainingTime();

        // Clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, [startTime, duration]);

    const formatTime = (time) => (time < 10 ? `0${time}` : time);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        <Card>
            <Card.Body>
                <Card.Title>Time Remaining</Card.Title>
                <Card.Text>
                    {formatTime(minutes)}:{formatTime(seconds)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default QuizTimer;
