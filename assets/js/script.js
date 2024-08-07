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

    // Create the modal structure dynamically
    const modalHTML = `
        <div id="feedbackModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p id="feedbackText"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get the modal and close button
    const modal = document.getElementById('feedbackModal');
    const span = document.querySelector('.close');
    const feedbackText = document.getElementById('feedbackText');

    // Get all input fields
    const inputFields = document.querySelectorAll('input[type=text]');

    // Add event listeners to each input field for the "Enter" key
    inputFields.forEach(inputField => {
        inputField.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const parentDiv = this.parentElement;
                const countryId = parentDiv.id;
                const userAnswer = this.value.trim().toLowerCase();

                // Check the answer
                checkAnswer(countryId, userAnswer);
            }
        });
    });

    // Function to check the answer
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

        // Disable input and button
        disableInput(country);

        // Check if the quiz is completed
        if (correctAnswers + incorrectAnswers === Object.keys(quizQuestions).length) {
            displayFinalMessage();
        }
    }

    // Function to display feedback in the modal
    const displayFeedback = (message) => {
        feedbackText.textContent = message;
        modal.style.display = "block";
    };

    // Function to disable input and button
    function disableInput(country) {
        const inputField = document.querySelector(`#${country} input[type=text]`);
        const submitButton = document.querySelector(`#${country} button`);
        inputField.disabled = true;
        submitButton.disabled = true;
    }

    // Function to display final message based on score
    const displayFinalMessage = () => {
        if (correctAnswers === 5) {
            displayFeedback("Congratulations! You got all answers correct!");
        } else {
            displayFeedback("You need to visit the library.");
        }
    };

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});