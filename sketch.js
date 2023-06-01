math.random(1)
const w = 720
const h = 400
const FOODCOUNT = 5;
let wasp;
let food = [];
function setup() {
    angleMode(DEGREES);
    // Set simulation framerate to 10 to avoid flickering
    frameRate(20);
    createCanvas(w, h);
    
    for(let i = 0; i < FOODCOUNT; i++){
        food.push(new Food(random(w),random(h)))
    }
    
    wasp = new Wasp(w / 2, h/2, food);
    console.log(wasp.closestFood)
}

function draw() {
    background(255);
    wasp.display();
    food.forEach(f => f.display())
    //wasp.move(45, 1);
}
