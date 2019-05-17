const MovingObject = require('./moving_object');


class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.startRound = this.startRound.bind(this);
        this.cats = [new MovingObject(800)];
    }

    addCat() {
        this.cats.push(new MovingObject());
    }

    startGame(){
        // for (let i = 1; i < 3; i++) {

        // }
        this.startRound();
    }

    startRound() {
        // let id;
        // const gameLoop = () => {
        //     this.addCat();
        //     id = requestAnimationFrame(gameLoop);
        //     c.fillStyle = "#afceff";
        //     c.fillRect(0, 0, 800, 800);

        let id = requestAnimationFrame(this.startRound);


            this.cats.slice(this.cats.length-1)[0].move(this.ctx, id);
            this.cats.slice(0, this.cats.length-1).forEach( cat => {
                cat.draw(this.ctx);
            });
            // console.log(this.cats);
            if (this.cats.slice(this.cats.length-1)[0].vel.y == 0) {
                const prevHeight = (this.cats.slice(this.cats.length-1)[0].pos.y - 80);
                console.log("prevheight", prevHeight);
                this.cats.push(new MovingObject(prevHeight));
                // if (prevHeight > -80) {
                if (this.cats.length < 10){
                    this.startRound();
                }
            }
            // let catNo = this.cats.length-1;      doesnt work
            // this.cats[catNo].move(c, id);
            // if (this.cats[catNo].vel.y === 0) {
            //     console.log("Done");
            // }
        // };
        // gameLoop();
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