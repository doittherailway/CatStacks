// gravity
// const ag = 9.81; // kg/m^3 /// -> convert this to pixels to make cat fall slower
const ag = 3;

const frameRate = 1/40; //seconds 
const frameDelay = frameRate * 1000; // ms

class MovingObject {
    constructor() {
        this.pos = {x: 350, y: 30};
        this.vel = {x: 0, y: 10};
        this.width = 50;
        this.height =  50;
        this.color = '#46b1c9';
        this.area = this.width * this.height / 1000;
        this.mass = 1;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        // console.log(this.pos.y);
        // console.log(this.vel.y);
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    handleCollision(id) {
        if (this.pos.y >= 750 - (this.height/2)) {
            this.vel.y = 0;
            cancelAnimationFrame(id);
        }
    }

    move(ctx, id) {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height); // clear previous 

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

        
        // handle collisions
        this.handleCollision(id);
        
        this.draw(ctx); // render at new position
    }

    // handle collisions
}

module.exports = MovingObject;