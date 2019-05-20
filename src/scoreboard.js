const fish = new Image();
fish.src = 'https://i.imgur.com/D1JnPpu.png';

class Scoreboard {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.scoreboardWidth = 70;
        this.fishSize = 60;
        this.img = fish;
        // this.lives = lives;
        // this.score = score;
    }

    render(lives, score){
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.rect(0, 0, this.canvasWidth, 130);
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.canvasWidth, 130);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#ff8811";
        this.ctx.font = '20px Roboto, sans-serif';
        this.ctx.fillText("Score", 5, 30, 70);
        this.ctx.fillText(score, 20, 60, 70);
        this.ctx.fillText("Lives", 740, 30, 70);
        this.renderFish(lives);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    renderFish(number){
        switch(number) {
            case 1:
                // this.ctx.beginPath();
                // this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
                // this.ctx.rect(750, 50, 40, 40);
                // this.ctx.closePath();
                // this.ct
                // this.ctx.fillStyle = this.color;
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 35, this.fishSize, this.fishSize);
                break;
            case 2:
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 35, this.fishSize, this.fishSize);
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 60, this.fishSize, this.fishSize);
                break;
            case 3:
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 35, this.fishSize, this.fishSize);
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 60, this.fishSize, this.fishSize);
                this.ctx.drawImage(this.img, this.canvasWidth - this.scoreboardWidth, 85, this.fishSize, this.fishSize);
                break;
            default:
                break;
        }
    }
    // ctx.beginPath();
    // ctx.fillStyle = "rgba(0, 0, 0, 0)";
    // ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    // ctx.closePath();
    // ctx.fillStyle = this.color;
    // ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
}

module.exports = Scoreboard;