class ActivationFunction {
    constructor(func, dfunc) {
        this.func = func;
        this.dfunc = dfunc;
    }
}

let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
);

class Brain{
    constructor(entity){
        this.parent = entity
        this.input_array = []
        this.output_array = []
        this.nn = new NeuralNetwork(this.input_functions.length, 3,this.output_functions.length);
        
    }
    loop(){
        
        this.input_array = this.getInputValues(this.parent)
        console.log(this.input_array)
        let outValues = this.nn.forward(this.input_array)
        //console.log(outValues)
        this.sendOutputEvents(this.parent, outValues)
        
        
    }
    input_functions = [
        {
            "data": { "name": "Closest Food" },
            "execute": (entity) => {
                return distance(entity.position, entity.closestFood.position)
                
            }
        },
        {
            "data": { "name": "Hunger" }, 
            "execute": (entity) => {
                return entity.hunger
            }
        }
    ]
    output_functions = [
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
    getInputValues(entity){
        let arr = []
        this.input_functions.forEach((input, index, array)=>{
            arr.push(input.execute(entity))
            //console.log(input.execute(entity))
        })
        return arr
    }
    sendOutputEvents(entity, values){
        this.output_functions.forEach((output, index, array)=>{
            output.execute(entity, values[index]);
            //console.log("executing "+output.data.name)
        })
    }
}

class NeuralNetwork {
    constructor(inp, hid, out) {
        if (inp instanceof NeuralNetwork) {
            let a = inp;
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes;
            this.output_nodes = a.output_nodes;

            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();

            this.bias_h = a.bias_h.copy();
            this.bias_o = a.bias_o.copy();
        } else {

            this.input_nodes = inp;
            this.hidden_nodes = hid;
            this.output_nodes = out;

            this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes).randomize()
            this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes).randomize()

            this.bias_h = new Matrix(this.hidden_nodes, 1).randomize()
            this.bias_o = new Matrix(this.output_nodes, 1).randomize()
        }
        this.setLearningRate();
        this.setActivationFunction();
    }

    setLearningRate(learning_rate = 0.1) {
        this.learning_rate = learning_rate;
    }

    setActivationFunction(func = sigmoid) {
        this.activation_function = func;
    }
    

    forward(input_array) {
        let inputs = Matrix.fromArray(input_array)
        let hidden = Matrix.multiply(this.weights_ih, inputs)
        hidden.add(this.bias_h)
        hidden.map(this.activation_function.func)

        let output = Matrix.multiply(this.weights_ho, hidden)
        output.add(this.bias_o)
        output.map(this.activation_function.func)

        return output.toArray();
    }


}
