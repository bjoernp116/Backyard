const FOODCOUNT = 5;
const WEIGHT_MUTATE_CHANCE = 0.05;
const BIAS_MUTATE_CHANCE = 0.05;
const START_CONNECTIONS = 2
const MAX_SPEED = 3
const MAX_SCORE = 0;
const DEV = true;
const WIDTH = 600;
const HEIGHT = 600;
let GENOME_INPUTS = 4;
let GENOME_OUTPUTS = 1;

const INPUT_FUNCTIONS = [
    {
        "data": { "name": "Closest Food Distance" },
        "execute": (entity) => {
            return distance(entity.position, entity.closestFood.position)
            
        }
    },
    {
        "data": { "name": "Closest Food Angle" },
        "execute": (entity) => {
            var deltaX = entity.closestFood.position.x - entity.position.x;
            var deltaY = entity.closestFood.position.y - entity.position.y;
            var rad = Math.atan2(deltaY, deltaX); // In radians
            return rad * (180 / Math.PI)
        }
    },
    {
        "data": { "name": "Hunger" }, 
        "execute": (entity) => {
            return entity.hunger
        }
    }
]

const OUTPUT_FUNCTIONS = [
    {
        "data": { "name": "Move", "parameter":"speed" },
        "execute": (entity, speed) => {
            entity.move(speed)
            
        }
    },
    {
        "data": { "name": "Turn", "parameter": "angle" }, 
        "execute": (entity, angle) => {
            entity.turn(angle)
          
        }
    }
]


function distance(v1, v2) {
    let a = v1.x-v2.x
    let b = v1.y-v2.y
    let d = sqrt((abs(a)^2)+(abs(b)^2)) 
    //console.log(v2.x+ ", "+ v2.y+", distance: "+d)
    return d;
}
function closestDistance(v, cArr){
    let i = 0
//    console.log("food array lenght: " + FOOD.length)
    FOOD.forEach((value, index, array)=>{
        //console.log("Food: "+value.position.x + ", "+ value.position.y+", distance: "+distance(v, value.position))
        if(distance(v, value.position)<distance(v,FOOD[i].position)){
            i = index;
        }
    })
    return FOOD[i];
}
function angleToCoords(x1,y1,x2,y2){
    let d = distance(x1, y1, x2, y2);
    let dx = (x2-x1) / d;
    let dy = (y2-y1) / d;
    
    let a = Math.acos(dx);
    a = dy < 0 ? 2 * Math.PI - a : a;
    return a;
}