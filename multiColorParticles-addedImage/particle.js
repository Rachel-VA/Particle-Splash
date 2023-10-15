// get the canvas name
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
//design to resize the canvas to fit any sreen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 100; //change particles # as desire
let hue = 0; // change the hue number value to change the display particles colors

// these code lines below is to position the words to display on the screen to see some particle boucing effect; change position as desire
/**
 * let titleElement = document.getElementById('title1');
titleMeasurements = titleElement.getBoundingClientRect();
let title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 1
    }
 * 
 */
    let titleElement = document.getElementById('title1');
    titleMeasurements = titleElement.getBoundingClientRect();
    let title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: titleMeasurements.height // Change this from '1' or '20' to the actual height of the image
    }
    

    //create a class and the constructors: they are a must do
class Particle {
    constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 12 + 1; //change size of particles
            this.weight = Math.random() * 1 + 1.5;
            this.directionX = (Math.random() * 2) - 1; //moving position for particles. 
        }
        //must have the update method
    update() {
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.weight = Math.random() * 1 + 1;
                this.x = Math.random() * canvas.width * 1.3; //particles cover canvas
            }
            this.weight += 0.01;
            this.y += this.weight;
            this.x += this.directionX;
            // check for collision between each particle & the title words
            if (
                this.x < title.x + title.width &&
                this.x + this.size > title.x &&
                this.y < title.y + title.height &&
                this.y + this.size > title.y
            ) {
                this.y -= 3;
                this.weight *= -0.6; //bouncing effect
            }
        }
        //now draw shape: ctx.fillStyle is to set color as desire
    draw() {
        ctx.fillStyle = '';
        ctx.beginPath(); //must  create the begin path method
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //draw arc is draw a circle; must pass in 5 arguments: x,y, radius = 0, begin and end circle: math.PI*2 is 360 deg (whole circle)
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'; // to use multi-color use this command. must declare a global  hue on top. To change the color, simply  set the global var hue = to #
        ctx.closePath();
        ctx.fill();
    }
}
//must have the init function to start
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}
init(); //call it to see it works

//create a function for animation
function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'; //change the first 3 numbers to 0,0,0 to have a black background. change 255 for white bg. the last # is to show the tails of particles. whole number will remove tails/trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    hue++; //to use make colors random, set the hue var = 0 and increase it here b4 the request animation method
    requestAnimationFrame(animate);
}
animate();
//the code lines below to handle the title words and bouncing effect
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: titleMeasurements.height  // using the full height of the image
    }
    init();
});
