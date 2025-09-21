document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');
    const playerScoreElement = document.getElementById('player-score');
    const winningLine = document.querySelector('.winning-line');

    let isGameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    let playerHearts = parseInt(localStorage.getItem('playerHearts')) || 0;
    
    playerScoreElement.textContent = playerHearts;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const winningLineData = [
        { angle: 0, x: 50, y: 50, length: '300px' },
        { angle: 0, x: 50, y: 160, length: '300px' },
        { angle: 0, x: 50, y: 270, length: '300px' },
        { angle: 90, x: 50, y: 50, length: '300px' },
        { angle: 90, x: 160, y: 50, length: '300px' },
        { angle: 90, x: 270, y: 50, length: '300px' },
        { angle: 45, x: 50, y: 50, length: '400px' },
        { angle: -45, x: 50, y: 270, length: '400px' }
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !isGameActive || currentPlayer === 'O') {
            return;
        }

        makeMove(clickedCellIndex, 'X');
        checkResult();

        if (isGameActive) {
            statusMessage.textContent = 'Turno de Stan...';
            setTimeout(handleCpuTurn, 1000);
        }
    };

    const makeMove = (index, player) => {
        gameState[index] = player;
        cells[index].textContent = player;
        cells[index].classList.add(player);
    };

    const checkResult = () => {
        let roundWon = false;
        let winningIndex = -1;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningIndex = i;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === 'X' ? 'Naho ♥' : 'Stan';
            statusMessage.textContent = `¡El jugador ${winner} ha ganado! 🎉`;
            isGameActive = false;
            
            if (currentPlayer === 'X') {
                playerHearts += 10;
            } else {
                playerHearts = Math.max(0, playerHearts - 5);
            }
            localStorage.setItem('playerHearts', playerHearts);
            playerScoreElement.textContent = playerHearts;
            
            const data = winningLineData[winningIndex];
            winningLine.style.width = data.length;
            winningLine.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.angle}deg)`;
            winningLine.style.opacity = '1';
            
            return;
        }

        const isDraw = !gameState.includes('');
        if (isDraw) {
            statusMessage.textContent = '¡Empate! 🤝';
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'X') {
            statusMessage.textContent = `Turno de Naho ♥`;
        } else {
            statusMessage.textContent = `Turno de Stan`;
        }
    };

    const handleCpuTurn = () => {
        let bestMove = getBestCpuMove();
        makeMove(bestMove, 'O');
        checkResult();
    };

    const getBestCpuMove = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === 'O' && gameState[b] === 'O' && gameState[c] === '') return c;
            if (gameState[a] === 'O' && gameState[c] === 'O' && gameState[b] === '') return b;
            if (gameState[b] === 'O' && gameState[c] === 'O' && gameState[a] === '') return a;
        }

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === 'X' && gameState[b] === 'X' && gameState[c] === '') return c;
            if (gameState[a] === 'X' && gameState[c] === 'X' && gameState[b] === '') return b;
            if (gameState[b] === 'X' && gameState[c] === 'X' && gameState[a] === '') return a;
        }

        if (gameState[4] === '') {
            return 4;
        }

        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(index => gameState[index] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        const availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    };

    const resetGame = () => {
        isGameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.textContent = 'Turno de Naho ♥';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        winningLine.style.width = '0';
        winningLine.style.opacity = '0';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});