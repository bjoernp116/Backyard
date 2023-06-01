let wasps;
let FOOD = [];
function setup() {
    angleMode(DEGREES);
    // Set simulation framerate to 10 to avoid flickering
    frameRate(20);
    
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('canvascontainer');
    for(let i = 0; i < FOODCOUNT; i++){
        FOOD.push(new Food(random(WIDTH),random(HEIGHT)))
    }

    wasps = new EntityHandler(3)
    console.log(wasps)

    
    //createEntity(Wasp, createVector(w/2,h/2))
    //createEntity(Wasp, createVector(w/2,h/2))
    
    
}


function draw() {
    background(174, 255, 128);
    wasps.updateAlive(true)    
    //wasps.population[0].show()
    FOOD.forEach(f => f.display())
    //wasp.move(45, 1);
}
