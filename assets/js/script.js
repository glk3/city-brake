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
