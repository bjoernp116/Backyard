const w = 720
const h = 400
const FOODCOUNT = 5;
const DEV = true;
let ENTETIES = [];
let FOOD = [];
function setup() {
    angleMode(DEGREES);
    // Set simulation framerate to 10 to avoid flickering
    frameRate(20);
    createCanvas(w, h);
    
    for(let i = 0; i < FOODCOUNT; i++){
        FOOD.push(new Food(random(w),random(h)))
    }
    createEntity(Wasp, createVector(w/2,h/2))
    //createEntity(Wasp, createVector(w/2,h/2))
    //createEntity(Wasp, createVector(w/2,h/2))
    console.log(ENTETIES.closestFood)
}
function createEntity(entity, position){
    ENTETIES.push(new entity(position.x, position.y, FOOD));

}

function draw() {
    background(255);
    ENTETIES.forEach((wasp, index)=>{
        if(wasp.dead) {ENTETIES.splice(index, 1); return};
        wasp.tick();
        //console.log(wasp.closestFood.position.x+", "+wasp.closestFood.position.y)
    })
    
    FOOD.forEach(f => f.display())
    //wasp.move(45, 1);
}
