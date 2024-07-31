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
            // Get the parent div id to identify the country
            const parentDiv = this.parentElement;
            const countryId = parentDiv.id;
            const inputField = parentDiv.querySelector('input[type=text]');
            const userAnswer = inputField.value.trim().toLowerCase();

            // Check the answer
            checkAnswer(countryId, userAnswer);
        });
    });