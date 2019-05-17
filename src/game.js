const MovingObject = require('./moving_object');


class Game {
    constructor(ctx) {
        this.cats = [];

        // this.addCat();
    }

    addCat() {
        this.cats.push(new MovingObject());
    }

    startGame(){
        for (let i = 1; i < 3; i++) {

        }
    }

    startRound(c) {
        let id;
        const gameLoop = () => {
            this.addCat();
            id = requestAnimationFrame(gameLoop);
            c.fillStyle = "#afceff";
            c.fillRect(0, 0, 800, 800);
            let catNo = this.cats.length-1;
            this.cats[catNo].move(c, id);
            if (this.cats[catNo].vel.y === 0) {
                console.log("Done");
            }
        };
        gameLoop();
        // when does this loop end, and how can I tell?
    }

    checkCollisions(id) {
        if (this.pos.y >= 800 - this.cats[0].height) {
            this.vel.y = 0;
            cancelAnimationFrame(id);
        }

    }

    step(c, id) {
        this.cats[0].move(c, id);
    }

    // drop first cat
    // hits ground
    // wait
    // drop next cat
    // stops when hits prev cat (also eventually ground)
    // game 'scrolls up'
    // drop next cat etc
}

module.exports = Game;