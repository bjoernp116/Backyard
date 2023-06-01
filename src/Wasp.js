class Wasp {
    constructor(id) {
        this.brain = new Genome(GENOME_INPUTS, GENOME_OUTPUTS);
        this.fitness;
        this.score = 1;
        this.lifespan = 0;
        this.dead = false;
        this.decisions = []; //Current Output values
        this.vision = []; //Current input values

        this.x = 300;
        this.y = 300;

        this.vx = 0;
        this.vy = 0;

        this.radius = 7;
    }

    clone() {
        //Returns a copy of this player
        let clone = new Player();
        clone.brain = this.brain.clone();
        return clone;
    }

    crossover(parent) {
        //Produce a child
        let child = new Player();
        if (parent.fitness < this.fitness)
            child.brain = this.brain.crossover(parent.brain);
        else child.brain = parent.brain.crossover(this.brain);

        child.brain.mutate();
        return child;
    }

    look() {
        //Look and normalize
        var trg = closestDistance(createVector(this.x, this.y));
        var dist =
            Math.sqrt(this.x, this.y, trg.position.x, trg.position.y) /
            Math.sqrt(width ** 2 + height ** 2);
        var targetAngle =
            (angleToCoords(this.x, this.y, trg.position.x, trg.position.y) /
                Math.PI) *
            2;
        var vx = (this.vx + MAX_SPEED) / MAX_SPEED;
        var vy = (this.vy + MAX_SPEED) / MAX_SPEED;

        // NaN checking
        targetAngle = isNaN(targetAngle) ? 0 : targetAngle;
        dist = isNaN(dist) ? 0 : dist;

        this.vision = [vx, vy, dist, targetAngle];
    }
    think() {
        this.decisions = this.brain.feedForward(this.vision);
    }
    
    move() {
        var moveAngle = this.decisions[0] * 2 * Math.PI;

        // Calculate next position
        let ax = Math.cos(moveAngle);
        let ay = Math.sin(moveAngle);
        this.vx += ax;
        this.vy += ay;

        // Limit speeds to maximum speed
        this.vx =
            this.vx > MAX_SPEED
                ? MAX_SPEED
                : this.vx < -MAX_SPEED
                ? -MAX_SPEED
                : this.vx;
        this.vy =
            this.vy > MAX_SPEED
                ? MAX_SPEED
                : this.vy < -MAX_SPEED
                ? -MAX_SPEED
                : this.vy;

        this.x += this.vx;
        this.y += this.vy;

        // Limit position to width and height
        this.x = this.x >= width ? width : this.x <= 0 ? 0 : this.x;
        this.y = this.y >= height ? height : this.y <= 0 ? 0 : this.y;

        //Change direction against walls
        if (this.x == 0 || this.x == width) this.vx = -this.vx;
        if (this.y == 0 || this.y == height) this.vy = -this.vy;
    }

    show() {
        var angle =
            angleToCoords(this.x, this.y, this.x + this.vx, this.y + this.vy) +
            Math.PI / 2;
        var op = map(this.score, 0, MAX_SCORE, 25, 255);
        fill(255, 213, 0)
        push();
        translate(this.x, this.y);
        rotate(angle);
        noStroke();
        triangle(
            -this.radius,
            this.radius,
            this.radius,
            this.radius,
            0,
            -this.radius
        );
        pop();
        if (DEV) {
            var trg = closestDistance(createVector(this.x, this.y));
            line(this.x, this.y, trg.position.x, trg.position.y);
        }
        
    }
}
