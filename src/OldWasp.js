

class Wasp {
    constructor(x, y) {
        this.color = color(
            floor(random(255)),
            floor(random(255)),
            floor(random(255))
        );
        this.hunger = 100;
        this.position = createVector(x, y);
        this.maxSpeed = 7;
        this.speed = 0;
        this.angle = 0;
        this.closestFood = 0
        this.brain = new Brain(this)
        this.dead = false
        
    }
    tick(){
        if(this.dead)return;
        if(this.hunger <= 0){
            this.dead = true
        }
        this.closestFood = closestDistance(this.position, FOOD)
        FOOD.forEach((food, index) =>{
            if(distance(this.position, food.position)<2){
                this.eat(food, index)
            }
        })
        this.display()
        this.brain.loop()
        
    }
    eat(food, index){
        FOOD.splice(index, 1)
        this.hunger = 100
    }

    display() {
        // method!
        fill(this.color);
        ellipse(this.position.x, this.position.y, 30, 30);
        if(DEV){
            line(this.position.x, this.position.y, this.closestFood.position.x, this.closestFood.position.y)
        }
    }
    turn(angle){
        this.angle = angle*360;
    }
    move(s) {
        // method!
        this.speed = s;
        this.position.x += this.speed * this.maxSpeed * cos(this.angle);
        this.position.y += this.speed * this.maxSpeed * sin(this.angle);
        this.hunger -= 0.5;
    }
} //end class Car
