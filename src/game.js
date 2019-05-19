const MovingObject = require('./moving_object');
const ScoreBoard = require('./scoreboard');
const scoreWidth = 70;
const paws = new Image();
paws.src = '../images/catpaws.png';
const cat = new Image();
cat.src = '../images/cat.png';

class Game {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.cats = [];  
        this.gameCats = [];
        this.gameinProgress = false;
        this.roundinProgress = false;
        this.gameOver = false;
        this.translateOffset = 0;
        this.prevCatDidTopple = false;
        this.lives = 3;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.scoreBoard = new ScoreBoard(this.ctx, this.canvasWidth, this.canvasHeight);

        this.startRound = this.startRound.bind(this);
        this.stepRound = this.stepRound.bind(this);
        this.addCat = this.addCat.bind(this);
    }

    startMenu(){
        this.ctx.beginPath();
        // this.ctx.fillStyle = "#907ad6";
        // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.fillStyle = "#ff8811";
        this.ctx.fillRect (this.canvasWidth / 2 - 150, this.canvasHeight / 2 - 20, 300, 100);
        this.ctx.fillStyle = "#25283D";
        this.ctx.font = '16px Roboto, sans-serif';
        this.ctx.fillText("click anywhere to", this.canvasWidth / 2 - 65, this.canvasHeight / 2 + 10, 200);
        this.ctx.font = '40px Roboto, sans-serif';
        this.ctx.fillText("Start Game", this.canvasWidth / 2 - 100, this.canvasHeight / 2 + 50, 200);
        this.ctx.drawImage(cat, this.canvasWidth / 2 - 50, this.canvasHeight / 2  - 130, 100, 100);
        this.ctx.closePath();
        if (this.gameinProgress === false) {
            window.addEventListener('click', (e) => {
                // look at keyCode property of event object: var key = String.fromCharCode(event.which);
                if (e.preventDefaulted) {
                    return;  // do nothing if event is already being processed
                }
                e.preventDefault();
                if (this.gameinProgress === false) {   // remove event listener

                    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.gameinProgress = true;
                    this.startGame();
                }
            });
        }
    }

    addCat(prevCat) {
        this.cats.push(new MovingObject(prevCat, this.canvasWidth, this.canvasHeight));
        // this.boardCats.push(this.cats.slice(this.cats.length - 1)[0]);
        return this.cats.slice(this.cats.length - 1)[0];
    }

    renderScoreboard(){
        this.scoreBoard.render(this.lives, this.cats.length);
    }

    startGame(){
        this.startRound();
    }

    startRound() {
        // if (this.cats.length >= 4) {
            //     this.translateOffset += 80;
            //     this.ctx.translate(0, this.translateOffset);
            // }
        this.renderScoreboard();

            this.boardCats = this.cats;
            
            if (this.cats.length >= 4 && this.prevCatDidTopple === false) {
                this.boardCats = this.cats.slice(this.cats.length-4, this.cats.length); /////
                // console.log(this.boardCats);
                this.pushDownCats();



                // this.ctx.save();
                // this.translateOffset += 80;
                // console.log(this.translateOffset);
                // newCat.pos.y -= this.translateOffset;
                // this.ctx.translate(0, -this.translateOffset);
                // this.ctx.clearRect(scoreWidth, 0, 800 - scoreWidth, 800); // not working //
                // this.cats.slice(0, this.cats.length - 1).forEach(cat => {   // redraw previous cats (maybe only 3-4 latest)
                //     cat.pos.y += 80;
                //     cat.draw(this.ctx);
                // });
                // this.ctx.restore();
                // console.log(this.cats);
                // debugger;

                // this.boardCats.forEach(cat => {   // redraw previous cats (maybe only 3-4 latest)
                //     cat.shiftDown();
                //     console.log(cat.pos.y);
                //     cat.draw(this.ctx);
                // }); // this is not working, cats are not shifting their positions
            }
            let lastCat = this.cats.slice(this.cats.length - 1)[0]; 
            
            let newCat = this.addCat(lastCat);
            

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

        this.boardCats.forEach( cat => {   // redraw previous cats
            cat.draw(this.ctx);
        });

        if (currentCat.vel.y === 0) {                          // if the current Cat stops moving
            // const prevHeight = (currentCat.pos.y - 80);       //find out it's end y position for collisions
            // console.log("prevheight", prevHeight);
            // this.addCat(prevHeight).topMove(this.ctx);                           // create a new cat on end of cats array

            // console.log(newCat.pos.y);
            if (!currentCat.onStack) {
                this.cats.pop();
                this.prevCatDidTopple = true;
                this.lives -= 1;
            } else {
                this.prevCatDidTopple = false;
            }
            this.roundinProgress = false;
            
            if (this.lives === 0) {
                this.gameOver = true;
            }
            // newCat.topMove(this.ctx, this.translateOffset);
            this.startRound();
        }
    }

    pushDownCats() {
        this.boardCats.forEach(cat => {
            cat.shiftDown(this.ctx);
        });
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