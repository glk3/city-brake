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

    const modalHTML = `
        <div id="feedbackModal" class="modal">
            <div class="modal-content">
                <p id="feedbackText"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('feedbackModal');
    const feedbackText = document.getElementById('feedbackText');

    const inputFields = document.querySelectorAll('input[type=text]');
    inputFields.forEach(inputField => {
        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const parentDiv = this.parentElement;
                const countryId = parentDiv.id;
                const userAnswer = this.value.trim().toLowerCase();
                checkAnswer(countryId, userAnswer);
            }
        });
    });

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
        }, 3000); // Adjust the time (3000ms = 3 seconds) if needed
    };

    function disableInput(country) {
        const inputField = document.querySelector(`#${country} input[type=text]`);
        inputField.disabled = true;
    }

    const displayFinalMessage = () => {
        if (correctAnswers === 5) {
            displayFeedback("Congratulations! You got all answers correct!");
        } else {
            displayFeedback("You need to visit the library.");
        }
    };
});