const frameDelay = (1/40) * 1000; // ms, 1/40 is framerate from movingobject
const Game = require('./game');
module.exports = Object.freeze({
    canvasWidth: 50
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game-canvas');

    canvas.width = 800;
    canvas.height = 600;
    const c = canvas.getContext('2d');
    
    const game = new Game(c, canvas.width, canvas.height, canvas);
    window.setTimeout(() => (game.startMenu()), 200);
    
    // const topCat = new MovingObject(800);
    // topCat.topMove(c);
    
});
