const MovingObject = require('./moving_object');


class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.cats = [new MovingObject(800)];
        this.roundinProgress = false;
        this.gameOver = false;

        this.startRound = this.startRound.bind(this);
        this.stepRound = this.stepRound.bind(this);
        this.addCat = this.addCat.bind(this);
    }

    addCat(prevCat) {
        this.cats.push(new MovingObject(prevCat));
        return this.cats.slice(this.cats.length - 1)[0];
    }

    startGame(){
        this.startRound();
    }

    startRound() {
        let currentCat = this.cats.slice(this.cats.length - 1)[0];

        if (!this.gameOver) {
            currentCat.topMove(this.ctx);
        }

        window.addEventListener('keydown', (e) => { 
              // look at keyCode property of event object: var key = String.fromCharCode(event.which);
            if (e.preventDefaulted) {
                return;  // do nothing if event is already being processed
            }
            if (!this.roundinProgress && !this.gameOver) {
                this.stepRound();
            }
            e.preventDefault();
            
        });
    }

    stepRound() {
        // let id;
        // const gameLoop = () => {
        //     this.addCat();
        //     id = requestAnimationFrame(gameLoop);
        //     c.fillStyle = "#afceff";
        //     c.fillRect(0, 0, 800, 800);
        this.roundinProgress = true;
        let id = requestAnimationFrame(this.stepRound);

        let currentCat = this.cats.slice(this.cats.length - 1)[0];  // get latest cat
        currentCat.movingX = false;

        currentCat.move(this.ctx, id);  // move last cat

        this.cats.slice(0, this.cats.length-1).forEach( cat => {   // redraw previous cats
            cat.draw(this.ctx);
        });

        if (currentCat.vel.y === 0) {                          // if the current Cat stops moving
            // const prevHeight = (currentCat.pos.y - 80);       //find out it's end y position for collisions
            // console.log("prevheight", prevHeight);
            // this.addCat(prevHeight).topMove(this.ctx);                           // create a new cat on end of cats array
            this.addCat(currentCat).topMove(this.ctx);
            this.roundinProgress = false;
            if (this.cats.length >= 9){
                this.gameOver = true;
            }
        }
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