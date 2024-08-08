document.addEventListener("DOMContentLoaded", function () {
    const quizQuestions = {
        germany: 'berlin',
        france: 'paris',
        italy: 'rome',
        england: 'london',
        australia: 'canberra'
    };

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const modal = document.getElementById('feedbackModal');
    const feedbackText = document.getElementById('feedbackText');

    // Handle Enter key press
    const inputFields = document.querySelectorAll('input[type=text]');
    inputFields.forEach(inputField => {
        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmission(this);
            }
        });
    });

    // Handle Submit button clicks
    const submitButtons = document.querySelectorAll('button');
    submitButtons.forEach(button => {
        button.addEventListener('click', function () {
            handleSubmission(this.previousElementSibling);
        });
    });

    function handleSubmission(inputField) {
        const parentDiv = inputField.parentElement;
        const countryId = parentDiv.id;
        const userAnswer = inputField.value.trim().toLowerCase();
        checkAnswer(countryId, userAnswer);
    }

    function checkAnswer(country, userAnswer) {
        const correctAnswer = quizQuestions[country];
        if (userAnswer === correctAnswer) {
            correctAnswers++;
            document.getElementById('score').textContent = correctAnswers;
            displayFeedback(`Your answer "${userAnswer}" is correct!`);
        } else {
            incorrectAnswers++;
            document.getElementById('incorrect').textContent = incorrectAnswers;
            displayFeedback(`Your answer "${userAnswer}" is incorrect. The correct answer is "${correctAnswer}".`);
        }
        disableInput(country);

        // Check if all questions have been answered
        if (correctAnswers + incorrectAnswers === Object.keys(quizQuestions).length) {
            displayFinalMessage();
        }
    }

    const displayFeedback = (message) => {
        feedbackText.textContent = message;
        modal.style.display = "block";

        // Automatically hide the modal after displaying the message
        setTimeout(() => {
            modal.style.display = "none";
        }, 2000); // Adjust the time (2000ms = 2 seconds) if needed
    };

    function disableInput(country) {
        const inputField = document.querySelector(`#${country} input[type=text]`);
        const submitButton = document.querySelector(`#${country} button`);
        inputField.disabled = true;
        submitButton.disabled = true;
    }

    const displayFinalMessage = () => {
        if (correctAnswers === 5) {
            displayFeedback("Congratulations! You got all answers correct!");
        } else {
            displayFeedback("You need to improve your knowlage.");
        }
    };

    // For Mobile
    modal.addEventListener('click', () => {
        console.log('Modal clicked');
    });

    window.addEventListener('resize', () => {
        console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`);
    });

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