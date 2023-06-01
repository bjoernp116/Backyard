function distance(v1, v2) {
    let a = abs(v1.x-v2.x)
    let b = abs(v1.y-v2.y)
    let c = sqrt(a^2+b^2)
    return c;
}
function closestDistance(v, cArr){
    let i = 0
    console.log("f food array lenght: " + cArr.length)
    cArr.forEach((value, index, array)=>{
        if(distance(v, value.position)<distance(v,cArr[i].position)){
            
            i = index;
        }
    })
    return cArr[i];
}
class Wasp {
    /* Constructor expects parameters for
    fill color, x and y coordinates that
    will be used to initialize class properties.
    */

    constructor(x, y, food) {
        this.color = color(
            floor(random(255)),
            floor(random(255)),
            floor(random(255))
        );
        this.hunger = 100;
        this.position = createVector(x, y);
        this.maxSpeed = 2;
        this.speed = 0;
        this.angle = 0;
        this.closestFood = closestDistance(this.position, food)
        this.brain = []
    }

    display() {
        // method!
        fill(this.color);
        ellipse(this.position.x, this.position.y, 30, 30);
    }

    move(a, s) {
        // method!
        this.angle = a;
        this.speed = s;
        this.position.x += this.speed * this.maxSpeed * cos(this.angle);
        this.position.y += this.speed * this.maxSpeed * sin(this.angle);
    }
} //end class Car
