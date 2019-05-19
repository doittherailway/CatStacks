// gravity
// const ag = 9.81; // kg/m^3 /// -> convert this to pixels to make cat fall slower
const ag = 9.81;

const frameRate = 1/40; //seconds 
const frameDelay = frameRate * 1000; // ms

const img = new Image();
// img.onload = someFunctionToCallWhenTheImageHasLoaded;
img.src = '../images/cat.png';

const imgFlip = new Image();
imgFlip.src = '../images/cat_flip.png';

const scoreWidth = 50;

class MovingObject {
    constructor(prevCat) {
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
            if (this.pos.y >= 800 - this.height || this.pos.y >= this.prevCat) {
                this.vel.y = 0;
                cancelAnimationFrame(id);
            }
        } else if (!this.onStack) {
            if (this.pos.y >= 800) {
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
            console.log("Fall off left");
            this.onStack = false;
        } else if (halfCatPosX > (this.prevCat.pos.x + this.prevCat.width)) {
            console.log("Fall off right");
            this.onStack = false;
        }
    }

    toppleOff(ctx) {
        let id = requestAnimationFrame(() => (this.toppleOff(ctx)));
        ctx.clearRect(scoreWidth, 0, 800 - (2 * scoreWidth), 800);
        ctx.drawImage(imgFlip, this.pos.x, this.pos.y, this.width, this.height);
        this.img = imgFlip;
        // this.vel.y = 0;
        cancelAnimationFrame(id);
        //set this.vel.y to 0 at end
    }

    topMove(ctx, translateOffset) {
        let id = requestAnimationFrame(() => (this.topMove(ctx, translateOffset)));
        // this.pos.y += translateOffset;
        if (this.movingX) {
            // ctx.clearRect(0, 0 - translateOffset, 800, this.height + 30);
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.rect(scoreWidth, 0 - translateOffset, 800 - (scoreWidth*2), this.height + 30 + translateOffset);
            ctx.closePath();
            ctx.clearRect(scoreWidth, 0 - translateOffset, 800 - (scoreWidth * 2), this.height + 30 + translateOffset);
            // if (translateOffset !== 0) {this.pos.y -= 80;}
            // console.log(this.pos.y);
            this.draw(ctx);
            this.pos.x += this.vel.x;
            if (this.pos.x + this.vel.x > 800 - this.width - scoreWidth|| this.pos.x + this.vel.x < 0 + scoreWidth){
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

        // ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height); // clear previous 
        // Calculate drag force
        let Fd = -0.5 * this.area * this.vel.y * this.vel.y;
        // Force in the y direction (ignoring x for now)
        let Fy = Fd * this.vel.y / Math.abs(this.vel.y);
        // console.log("Fy", Fy);
        
        // Calculate y direction acceleration (F = ma), assuming mass of 1
        let ay = ag + (Fy / this.mass);
        // Integrate to get y direction velocity
        this.vel.y += ay * frameRate;
        // console.log("vel.y", this.vel.y);
        
        // Integrate to get position
        this.pos.y += this.vel.y * frameRate * 100; // why is this 100? check collision before moving
        // console.log("pos.y", this.pos.y);

        // handle collisions
        this.handleCollision(id, ctx);
        // if (this.onStack){
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.rect(scoreWidth, 0, 800 - (scoreWidth * 2), 800);
        ctx.closePath();
        ctx.clearRect(scoreWidth, 0,800 - (2 *scoreWidth), 800);
        this.draw(ctx); // render at new position
        // }
    }

    shiftDown(ctx){
        //let id = requestAnimationFrame(() => (this.shiftDown(ctx)));
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.rect(scoreWidth, this.pos.y, 800 - (scoreWidth * 2), this.height); 
        ctx.closePath();
        ctx.clearRect(scoreWidth, this.pos.y, 800 - (2 * scoreWidth), this.height); 
        this.pos.y += this.height;
        this.draw(ctx); // render at new position
    }

    // handle collisions
}

module.exports = MovingObject;


//ctx,save
// offset
// ctx.translate

// clear and draw
// ctx.restore