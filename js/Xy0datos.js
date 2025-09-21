document.addEventListener('DOMContentLoaded', () => {
    const playerScoreElement = document.getElementById('player-score');
    const cpuScoreElement = document.getElementById('cpu-score');

    const playerHearts = parseInt(localStorage.getItem('playerHearts')) || 0;
    
    const playerOWins = parseInt(localStorage.getItem('playerOWins')) || 0;
    const cpuHearts = playerOWins * 10; 

    playerScoreElement.textContent = playerHearts;
    cpuScoreElement.textContent = cpuHearts;
});