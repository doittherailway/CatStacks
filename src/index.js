
const MovingObject = require('./moving_object');
const frameDelay = (1/40) * 1000; // ms, 1/40 is framerate from movingobject
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game-canvas');
    const c = canvas.getContext('2d');

    const game = new Game(c);
    game.startGame();

    // const topCat = new MovingObject(800);
    // topCat.topMove(c);
    
});