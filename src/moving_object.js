// gravity
// const ag = 9.81; // kg/m^3 /// -> convert this to pixels to make cat fall slower
const ag = 9.81;

const frameRate = 1/40; //seconds 
const frameDelay = frameRate * 1000; // ms

const img = new Image();
// img.onload = someFunctionToCallWhenTheImageHasLoaded;
img.src = 'https://i.imgur.com/qIlRKSS.png';

const imgFlip = new Image();
imgFlip.src = 'https://i.imgur.com/GdvQmR7.png';

const scoreWidth = 70;

class MovingObject {
    constructor(prevCat, canvasWidth, canvasHeight) {
        this.pos = {x: 350, y: 30};
        this.vel = {x: 7, y: 0};
        this.width = 80;
        this.height =  80;
        // this.color = '#46b1c9';
        this.color = '#afceff';
        this.area = this.width * this.height / 1000;
        this.mass = 1;

        this.prevCat = prevCat;
        this.movingX = true;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.onStack = true;
        this.img = img;

        this.topMove = this.topMove.bind(this);
        this.draw = this.draw.bind(this);
        this.toppleOff = this.toppleOff.bind(this);
        this.shiftDown = this.shiftDown.bind(this)
        
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }

    handleCollision(id, ctx) {
        if (this.prevCat === undefined) {  // if there is no previous cat
            if (this.pos.y >= this.canvasHeight - this.height || this.pos.y >= this.prevCat) {
                this.vel.y = 0;
                cancelAnimationFrame(id);
            }
        } else if (!this.onStack) {
            if (this.pos.y >= this.canvasHeight) {
                this.vel.y = 0;
                cancelAnimationFrame(id);
            }
        } else {
            if (this.pos.y >= this.prevCat.pos.y - this.prevCat.height) { // once cat falls to where the previous cat is stacked
                this.checkTopple();
                if (this.onStack) {
                    this.vel.y = 0;
                    cancelAnimationFrame(id); 
                } else {
                    // do topple animation -> needs to set this.vel.y to 0 at some point
                    this.toppleOff(ctx);
                    // this.vel.y = 0;
                    // cancelAnimationFrame(id); 
                }
            }
        }

    }

    checkTopple() {
        let halfCatPosX = this.pos.x + (this.width / 2);
        if (halfCatPosX < this.prevCat.pos.x) {
            this.onStack = false;
        } else if (halfCatPosX > (this.prevCat.pos.x + this.prevCat.width)) {
            this.onStack = false;
        }
    }

    toppleOff(ctx) {
        let id = requestAnimationFrame(() => (this.toppleOff(ctx)));
        ctx.clearRect(scoreWidth, 0, this.canvasWidth - (2 * scoreWidth), this.canvasHeight);
        ctx.drawImage(imgFlip, this.pos.x, this.pos.y, this.width, this.height);
        this.img = imgFlip;
        // this.vel.y = 0;
        cancelAnimationFrame(id);
        //set this.vel.y to 0 at end
    }

    topMove(ctx, translateOffset) {
        let id = requestAnimationFrame(() => (this.topMove(ctx, translateOffset)));
        if (this.movingX) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.rect(scoreWidth, 0 - translateOffset, this.canvasWidth - (scoreWidth*2), this.height + 30 + translateOffset);
            ctx.closePath();
            ctx.clearRect(scoreWidth, 0 - translateOffset, this.canvasWidth - (scoreWidth * 2), this.height + 30 + translateOffset);
            this.draw(ctx);
            this.pos.x += this.vel.x;
            if (this.pos.x + this.vel.x > this.canvasWidth - this.width - scoreWidth|| this.pos.x + this.vel.x < 0 + scoreWidth){
                this.vel.x = -this.vel.x;
            }
        } else {
            cancelAnimationFrame(id);
        }
    }

    move(ctx, id) {
        this.vel.x = 0;
        if (this.vel.y === 0){
            this.vel.y = 10;
        }
        // Calculate cat drag force
        let Fd = -0.5 * this.area * this.vel.y * this.vel.y;
        // Calculate force in the y direction (ignoring x for simplicity)
        let Fy = Fd * this.vel.y / Math.abs(this.vel.y);
        
        // Calculate y direction acceleration using F = ma, assuming mass of 1
        let ay = ag + (Fy / this.mass);
        // Integrate ay to get y velocity
        this.vel.y += ay * frameRate;
        // Integrate again to get position
        this.pos.y += this.vel.y * frameRate * 100; // Using 100 for now. Check collision before moving
        
        // https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
        this.handleCollision(id, ctx);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.rect(scoreWidth, 0, this.canvasWidth - (scoreWidth * 2), this.canvasHeight);
        ctx.closePath();
        ctx.clearRect(scoreWidth, 0,this.canvasWidth - (2 *scoreWidth), this.canvasHeight);
        this.draw(ctx); // render at new position
    }

    shiftDown(ctx){
       this.shiftDownAnim(ctx, this.pos.y + 80);
    }

    shiftDownAnim(ctx, endPosY){
         let id = requestAnimationFrame(() => (this.shiftDownAnim(ctx, endPosY)));
         if (this.pos.y !== endPosY) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.rect(scoreWidth, this.pos.y, this.canvasWidth - (scoreWidth * 2), this.height);
            ctx.closePath();
            ctx.clearRect(scoreWidth, this.pos.y, this.canvasWidth - (2 * scoreWidth), this.height);
            this.pos.y += 10;
            this.draw(ctx); // render at new position
         } else {
            cancelAnimationFrame(id); 
         }
    }

    // handle collisions
}

module.exports = MovingObject;


//ctx,save
// offset
// ctx.translate

// clear and draw
// ctx.restore