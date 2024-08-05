document.addEventListener("DOMContentLoaded", () => {
    // Get the high scores table body
    const highScoresTable = document.getElementById("highscores").querySelector('tbody');

    // Retrieve high scores from localStorage, or initialize an empty array if not present
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Check if there are any high scores to display
    if (highScores.length === 0) {
        // If no scores, display a message
        const noScoresRow = document.createElement("tr");
        const noScoresCell = document.createElement("td");
        noScoresCell.textContent = "No high scores yet. Play the quiz to set a high score!";
        noScoresCell.colSpan = 2; // Span across both columns
        noScoresRow.appendChild(noScoresCell);
        highScoresTable.appendChild(noScoresRow);
    } else {
        // If there are scores, sort them in descending order
        highScores.sort((a, b) => b.score - a.score);

        // Loop through highScores and create table rows for each
        highScores.forEach((score, index) => {
            const scoreRow = document.createElement("tr");

            // Create and append the user's name cell
            const nameCell = document.createElement("td");
            nameCell.textContent = `${index + 1}. ${score.name}`;
            scoreRow.appendChild(nameCell);

            // Create and append the user's score cell
            const scoreCell = document.createElement("td");
            scoreCell.textContent = score.score;
            scoreRow.appendChild(scoreCell);

            // Append the row to the table
            highScoresTable.appendChild(scoreRow);
        });
    }
});