const MovingObject = require('./moving_object');

const cat = new MovingObject();

const animate = () => {
    requestAnimationFrame(cat.move);
};