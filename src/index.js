
const MovingObject = require('./moving_object');
const frameDelay = (1/40) * 1000; // ms, 1/40 is framerate from movingobject
const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game-canvas');
    const c = canvas.getContext('2d');
    c.fillStyle = "#afceff";
    c.fillRect(0, 0, 800, 800);

    const cat = new MovingObject();

    // cat.draw(c);
    // loopTimer = setInterval(() => {
    //     cat.loop(c);}, 300);
    // let id;
    // const dropCat = () => {
    //     id = requestAnimationFrame(dropCat);
    //     c.fillStyle = "#afceff";
    //     c.fillRect(0, 0, 800, 800);
    //     cat.move(c, id);
        // if (cat.vel.y === 0){
        //     console.log("Done");
    //     // }
    // };
  
    // dropCat();

    const game = new Game(c);
    game.startGame();
    
});