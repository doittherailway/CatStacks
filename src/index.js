
const MovingObject = require('./moving_object');
const frameDelay = (1/40) * 1000; // ms, 1/40 is framerate from movingobject


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game-canvas');
    const c = canvas.getContext('2d');
    c.fillStyle = "#afceff";
    c.fillRect(0, 0, 800, 800);

    const cat = new MovingObject();
    
    // cat.draw(c);
    // loopTimer = setInterval(() => {
    //     cat.loop(c);}, 300);
    let id;
    const gameLoop = () => {
        id = requestAnimationFrame(gameLoop);
        c.fillStyle = "#afceff";
        c.fillRect(0, 0, 800, 800);
        cat.move(c, id);
    };

    gameLoop();

    
});