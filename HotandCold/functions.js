function generateFinish() {
    const map = document.getElementById('map-container');
    let finishX = generateRandomNumber(40, map.offsetWidth - 40, 20);
    let finishY = generateRandomNumber(40, map.offsetHeight - 40, 20);
    finish.style.left = finishX + 'px';
    finish.style.top = finishY + 'px';
    if (checkFinnishToBeValid(barriers, finish)) {
        generateFinish()
    }
}

function checkFinnishToBeValid(barriers, elementToBeChecked) {
    for (let barrier of barriers) {
        let barrierRect = barrier.getBoundingClientRect();
        let rect = elementToBeChecked.getBoundingClientRect();
        if (
            rect.left <= barrierRect.right &&
            rect.right >= barrierRect.left &&
            rect.top <= barrierRect.bottom &&
            rect.bottom >= barrierRect.top
        ) {
            return true;
        }
    }
    return false;
}

// Function to check if player has reached finish point
function checkWin(player, finish) {

    if (player.style.top === finish.style.top && player.style.left === finish.style.left) {
        alert('Congratulations! You found the finish point!');
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    playerX = 0;
    playerY = 0;
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    let finishX = generateRandomNumber(40, 380, 20);
    let finishY = generateRandomNumber(40, 380, 20);
    finish.style.left = finishX + 'px';
    finish.style.top = finishY + 'px';
}

// Function to check for collision with barriers
function checkCollision(barriers, elementToBeChecked) {
    for (let barrier of barriers) {
        let barrierRect = barrier.getBoundingClientRect();
        let rect = elementToBeChecked.getBoundingClientRect();
        if (
            rect.left < barrierRect.right &&
            rect.right > barrierRect.left &&
            rect.top < barrierRect.bottom &&
            rect.bottom > barrierRect.top
        ) {
            return true;
        }
    }
    return false;
}

// Function to handle arrow key movements
function movePlayer(e) {

    const player = document.getElementById('player');
    const finish = document.getElementById('finish');
    const map = document.getElementById('map-container');

    let playerX = parseInt(player.style.left);
    let playerY = parseInt(player.style.top);


    const arrowKeys = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
    };

    const moveDirection = arrowKeys[e.key];
    if (moveDirection) {
        e.preventDefault();

        // Update player position based on move direction
        switch (moveDirection) {
            case 'up':
                playerY -= 20;
                break;
            case 'down':
                playerY += 20;
                break;
            case 'left':
                playerX -= 20;
                break;
            case 'right':
                playerX += 20;
                break;
        }

        console.log(playerX , map.offsetWidth)
        if (! (playerX < 0 || playerX >= map.offsetWidth || playerY < 0 || playerY >= map.offsetHeight)) {

            let oldX = player.style.left;
            let oldY = player.style.top;

            // Update player position on the screen
            player.style.left = playerX + 'px';
            player.style.top = playerY + 'px';

            checkWin(player, finish);


            if (checkCollision(barriers, player)) {
                alert('Oops! You hit a barrier! Try again!');
                resetGame();
            } else {
                alertWarmOrCold(parseInt(oldX), playerX, parseInt(oldY), playerY, parseInt(finish.style.left), parseInt(finish.style.top))
            }
        }

    }
}

function generateRandomNumber(from, to, dividableTo, excludeRange = []) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (to - from + 1)) + from; 
    }
    while (randomNumber % dividableTo !== 0 && !checkIfNumberIsInTheRangesArray(randomNumber, excludeRange));

    return randomNumber;
}

function checkIfNumberIsInTheRangesArray(number, array) {
    for (let i = 0; i < array.length, i++;) {
        if (number >= array[i][0] && number <= array[i][1]) {
            return true
        }
    }
    return false;
}

function alertWarmOrCold(oldX, newX, oldY, newY, finishX, finishY) {
    if (oldX !== newX) {
        if (Math.abs(finishX - oldX) > Math.abs(finishX - newX)) {
            console.log('Warm');
            document.getElementById('alert').innerHTML = "Warm";
        } else {
            console.log('cold')
            document.getElementById('alert').innerHTML = "Cold";
        }
    }
    if (oldY !== newY) {
        if (Math.abs(finishY - oldY) > Math.abs(finishY - newY)) {
            console.log('Warm');
            document.getElementById('alert').innerHTML = "Warm";
        } else {
            console.log('cold')
            document.getElementById('alert').innerHTML = "Cold";
        }
    }
}
