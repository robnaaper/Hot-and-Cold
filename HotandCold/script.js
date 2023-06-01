// Get DOM elements
const player = document.getElementById('player');
const finish = document.getElementById('finish');
const barriers = document.querySelectorAll('.barrier');

let playerX = 0;
let playerY = 0;
player.style.left = playerX + 'px';
player.style.top = playerY + 'px';

generateFinish()

// Add event listener for arrow key movements
document.addEventListener('keydown', movePlayer);
