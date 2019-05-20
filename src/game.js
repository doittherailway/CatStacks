const MovingObject = require('./moving_object');
const ScoreBoard = require('./scoreboard');
const scoreWidth = 70;
const cat = new Image();
cat.src = 'https://i.imgur.com/qIlRKSS.png';
const sadCat = new Image();
sadCat.src = 'https://i.imgur.com/9MoS3lG.png';

class Game {
    constructor(ctx, canvasWidth, canvasHeight, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
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
            this.canvas.addEventListener('click', (e) => {
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
        return this.cats.slice(this.cats.length - 1)[0];
    }

    renderScoreboard(){
        this.scoreBoard.render(this.lives, this.cats.length);
    }

    startGame(){
        this.startRound();
    }

    startRound() {
        this.renderScoreboard();
        this.boardCats = this.cats;
            
        if (this.cats.length >= 4 && this.prevCatDidTopple === false) {
            this.boardCats = this.cats.slice(this.cats.length-4, this.cats.length);
            this.pushDownCats();
        }

        let lastCat = this.cats.slice(this.cats.length - 1)[0];    
        let newCat = this.addCat(lastCat);
            
        if (!this.gameOver) {
            newCat.topMove(this.ctx, this.translateOffset);
        } else {
            this.gameOverDisplay();
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
            // this.addCat(prevHeight).topMove(this.ctx);                           // create a new cat on end of cats array
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
            this.startRound();
        }
    }

    pushDownCats() {
        this.boardCats.forEach(cat => {
            cat.shiftDown(this.ctx);
        });
    }

    gameOverDisplay() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ff8811";
        this.ctx.fillRect(this.canvasWidth / 2 - 150, this.canvasHeight / 2 - 20, 300, 100);
        this.ctx.fillStyle = "#25283D";
        this.ctx.font = '40px Roboto, sans-serif';
        this.ctx.fillText("GAME OVER", this.canvasWidth / 2 - 100, this.canvasHeight / 2 + 20, 200);
        this.ctx.font = '20px Roboto, sans-serif';
        this.ctx.fillText("Your Final Score", this.canvasWidth / 2 - 60, this.canvasHeight / 2 + 45, 200);
        this.ctx.fillText(this.cats.length - 1, this.canvasWidth / 2 - 5, this.canvasHeight / 2 + 70, 200);
        this.ctx.drawImage(sadCat, this.canvasWidth / 2 - 50, this.canvasHeight / 2 - 130, 100, 100);
        this.ctx.closePath();
        
        // window.setTimeout(() => (location.reload()), 5000);
    }
}

module.exports = Game;