// gravity
// const ag = 9.81; // kg/m^3 /// -> convert this to pixels to make cat fall slower
const ag = 9.81;

const frameRate = 1/40; //seconds 
const frameDelay = frameRate * 1000; // ms

const img = new Image();
// img.onload = someFunctionToCallWhenTheImageHasLoaded;
img.src = '../images/cat.png';

class MovingObject {
    constructor(prevHeight) {
        this.pos = {x: 350, y: 30};
        this.vel = {x: 0, y: 10};
        this.width = 80;
        this.height =  80;
        // this.color = '#46b1c9';
        this.color = '#afceff';
        this.area = this.width * this.height / 1000;
        this.mass = 1;

        this.prevHeight = prevHeight;
    }

    draw(ctx) {
        
        ctx.fillStyle = this.color;
        ctx.drawImage(img, this.pos.x, this.pos.y, this.width, this.height);
    }

    handleCollision(id) {
        if (this.pos.y >= 800 - this.height || this.pos.y >= this.prevHeight) {
            this.vel.y = 0;
            cancelAnimationFrame(id);
        }
    }

    move(ctx, id) {
        // ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height); // clear previous 
        // Calculate drag force
        let Fd = -0.5 * this.area * this.vel.y * this.vel.y;
        // Force in the y direction (ignoring x for now)
        let Fy = Fd * this.vel.y / Math.abs(this.vel.y);
        console.log("Fy", Fy);
        
        // Calculate y direction acceleration (F = ma), assuming mass of 1
        let ay = ag + (Fy / this.mass);
        // Integrate to get y direction velocity
        this.vel.y += ay * frameRate;
        console.log("vel.y", this.vel.y);
    
        // Integrate to get position
        this.pos.y += this.vel.y * frameRate * 100; // why is this 100?
        console.log("pos.y", this.pos.y);

        
        
        // debugger;
        // handle collisions
        this.handleCollision(id);
        // console.log("clearReact", "x pos", this.pos.x, "y pos", this.pos.y, "width", this.width, "height", this.height);

        // ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.clearRect(0, 0,800, 800);
        this.draw(ctx); // render at new position
    }

    // handle collisions
}

module.exports = MovingObject;