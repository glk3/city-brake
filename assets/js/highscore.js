document.addEventListener('DOMContentLoaded', function() {
    const highScoresTable = document.getElementById('highscores');
    const unlockMessage = document.getElementById('unlock');

    // Retrieve high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // If there are no high scores, display the unlock message
    if (highScores.length === 0) {
        unlockMessage.style.display = 'block';
        highScoresTable.style.display = 'none';
    } else {
        unlockMessage.style.display = 'none';
        highScoresTable.style.display = 'table';

        // Create the table header
        highScoresTable.innerHTML = `
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        `;

        // Populate the table with high scores
        highScores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.name}</td>
                <td>${score.score}</td>
            `;
            highScoresTable.appendChild(row);
        });
    }
});