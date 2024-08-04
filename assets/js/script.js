document.addEventListener("DOMContentLoaded", function() {
    // Define the quiz questions and answers
    const quizQuestions = {
        germany: 'berlin',
        france: 'paris',
        italy: 'rome',
        england: 'london',
        australia: 'canberra'
    };

    // Initialize score counters
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Get all submit buttons
    const buttons = document.querySelectorAll('button');

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const parentDiv = this.parentElement;
            const countryId = parentDiv.id;
            const inputField = parentDiv.querySelector('input[type=text]');
            const userAnswer = inputField.value.trim().toLowerCase();

            // Check the answer
            checkAnswer(countryId, userAnswer);
        });
    });

    function checkAnswer(country, userAnswer) {
        // Get the correct answer
        const correctAnswer = quizQuestions[country];

        if (userAnswer === correctAnswer) {
            // Correct answer
            correctAnswers++;
            document.getElementById('score').textContent = correctAnswers;
            displayFeedback(country, userAnswer, true);
        } else {
            // Incorrect answer
            incorrectAnswers++;
            document.getElementById('incorrect').textContent = incorrectAnswers;
            displayFeedback(country, userAnswer, false, correctAnswer);
        }

        // Disable input and button
        disableInput(country);
    }

    function displayFeedback(country, userAnswer, isCorrect, correctAnswer = '') {
        // Construct the feedback message
        const feedbackMsg = `Your answer "${userAnswer}" is ${isCorrect ? 'correct' : `incorrect. The correct answer is "${correctAnswer}".`}`;
    
        // Display the feedback message in an alert window
        alert(feedbackMsg);
    }

    function disableInput(country) {
        const inputField = document.querySelector(`#${country} input[type=text]`);
        const submitButton = document.querySelector(`#${country} button`);
        inputField.disabled = true;
        submitButton.disabled = true;
    }
    // Reset function
    function resetQuiz() {
        correctAnswers = 0;
        incorrectAnswers = 0;
        document.getElementById('score').textContent = correctAnswers;
        document.getElementById('incorrect').textContent = incorrectAnswers;

        // Reset all input fields and buttons
        document.querySelectorAll('.flex div').forEach(div => {
            const inputField = div.querySelector('input[type=text]');
            const submitButton = div.querySelector('button');
            if (inputField && submitButton) {
                inputField.disabled = false;
                inputField.value = '';
                submitButton.disabled = false;
            }
        });
    }

    // Attach reset function to reset button
    document.getElementById('resetButton').addEventListener('click', resetQuiz);
});
