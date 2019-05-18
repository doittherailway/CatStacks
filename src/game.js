const MovingObject = require('./moving_object');


class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.cats = [];  //   this.cats = [new MovingObject(800)];
        this.roundinProgress = false;
        this.gameOver = false;
        this.translateOffset = 0;

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
        console.log("High Score:", this.cats.length);
        // this.ctx.clearRect(0, 0, 800, 800);
        if (this.cats.length >= 4) {
            // this.translateOffset += 80;
            // this.ctx.translate(0, this.translateOffset);
        }
        // this.cats.forEach(cat => {   // redraw previous cats
        //     cat.draw(this.ctx);
        // });
        
        let lastCat = this.cats.slice(this.cats.length - 1)[0]; // need to now account for if lastCat.onStack

        let newCat = this.addCat(lastCat);
        
        // newCat.pos.y -= 80;
        
        // if (this.cats.length >= 4) {
        //     this.translateOffset += 50;
        //     this.ctx.translate(0, translateOffset);
        // }

        if (!this.gameOver) {
            newCat.topMove(this.ctx, this.translateOffset);
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
        this.roundinProgress = true;
        let id = requestAnimationFrame(this.stepRound);

        let currentCat = this.cats.slice(this.cats.length - 1)[0];  // get latest cat
        currentCat.movingX = false;  
        currentCat.move(this.ctx, id);  // move latest cat

        this.cats.slice(0, this.cats.length-1).forEach( cat => {   // redraw previous cats
            cat.draw(this.ctx);
        });

        if (currentCat.vel.y === 0) {                          // if the current Cat stops moving
            // const prevHeight = (currentCat.pos.y - 80);       //find out it's end y position for collisions
            // console.log("prevheight", prevHeight);
            // this.addCat(prevHeight).topMove(this.ctx);                           // create a new cat on end of cats array

            // console.log(newCat.pos.y);
            if (!currentCat.onStack) {
                this.cats.pop();
            }
            this.roundinProgress = false;
            
            if (this.cats.length >= 9){
                this.gameOver = true;
            }
            // newCat.topMove(this.ctx, this.translateOffset);
            this.startRound();
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