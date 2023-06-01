
class Food {
    /* Constructor expects parameters for
    fill color, x and y coordinates that
    will be used to initialize class properties.
    */
    constructor(x, y) {
        this.color = color(51, 184, 87);

        this.position = createVector(x, y)
    }

    display() {
        // method!
        fill(this.color);
        ellipse(this.position.x, this.position.y, 10, 10);
    }
} //end class Car
