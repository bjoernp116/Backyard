
class Brain{
    constructor(entity){
        this.parent = entity
        this.input_array = []
        this.output_array = []
        this.nn = new NeuralNetwork(this.input_functions.length,this.output_functions.length);
        
    }
    loop(){
        
        this.input_array = this.getInputValues(this.parent)
        console.log(this.input_array + this.input_array.map((value,index)=>this.input_functions[index].data.name))
        
        let outValues = this.nn.forward(this.input_array)

        console.log(outValues + outValues.map((value,index)=>this.output_functions[index].data.name))
        
        this.sendOutputEvents(this.parent, outValues)
        
    }
    
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
    constructor(inp, out) {
        if (inp instanceof NeuralNetwork) {
            let a = inp;
            this.input_nodes = a.input_nodes;
            
            this.output_nodes = a.output_nodes;

            
            this.weights = a.weights.copy();
            
            this.nodes = a.nodes.copy()
            this.connections = a.connections.copy()
            
            this.bias = a.bias.copy();
        } else {
            
            this.input_nodes = inp;
            this.output_nodes = out;

            this.inpNodes = []
            this.outNodes = []
            this.connections = []
            
            this.weights = new Matrix(this.output_nodes, this.input_nodes).randomize()
            this.bias = new Matrix(this.output_nodes, 1).randomize()

            
            for (let i = 0; i < this.inputs; i++) {
				this.inpNodes.push(new Node(i, 0));
				
			}

			for (let i = 0; i < this.outputs; i++) {
				this.outNodes.push(new Node(i, 1, true));
			}

            for(var i = 0; i < START_CONNECTIONS; i++){
                this.connections.push(new Connection(random(this.inpNodes, this.outNodes)))
            }
        }

    }



    

    forward(input_array) {
        let inputs = Matrix.fromArray(input_array)

        let output = Matrix.multiply(this.weights, inputs)
        output.add(this.bias)
        output.map(this.activation_function.func)

        return output.toArray();
    }


}
class Connection{
    constructor(from, to, weight){
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.enabled = true;
    }

    mutateWeight(){
        let rand = random();
        if(rand < WEIGHT_MUTATE_CHANCE){
            this.weight = random(2)-1;
        }else{
            this.weight += randomGaussian()/50;
        }
    }

    clone(){
        let clone = new Connection(this.from, this.to, this.weight)
        clone.enabled = this.enabled;
        return clone;
    }


}
class Node{
    constructor(num, lay, isOutput){
        this.number = num;
        this.layer = lay;
        this.activationFunction = Math.floor(Math.random()*5);
        this.bias = Math.random() * 2 - 1;
        this.output = isOutput || false;

        this.inputSum = 0;
        this.outputValue = 0;
        this.outputConnections = [];    
    }

    engage(){
        if(this.layer != 0){
            this.outputValue = this.activation(this.inputSum, this.bias);
        }
    }
    
    mutateBias(){
        let rand = Math.random();
        if(rand < BIAS_MUTATE_CHANCE){
            this.bias = Math.random()*2-1
        }else{
            this.bias += randomGaussian() / 50;
        }

    }
    mutateActivation(){
        this.activationFunction = Math.floor(Math.random()*5)
    }

    isConnectedTo(node) { //Check if two nodes are connected
		if (node.layer == this.layer) //nodes in the same layer cannot be connected
			return false;


		if (node.layer < this.layer) { //Check parameter node connections
			node.outputConnections.forEach((conn) => {
				if (conn.toNode == this) //Is Node connected to This?
					return true;
			});
		} else { //Check this node connections
			this.outputConnections.forEach((conn) => {
				if (conn.toNode == node) //Is This connected to Node?
					return true;
			});
		}

		return false;
	}

    clone() { //Returns a copy of this node
		let node = new Node(this.number, this.layer, this.output);
		node.bias = this.bias; //Same bias
		node.activationFunction = this.activationFunction; //Same activationFunction
		return node;
	}



    activation(x) { //All the possible activation Functions
		switch (this.activationFunction) {
			case 0: //Sigmoid
				return 1 / (1 + Math.pow(Math.E, -4.9 * x));
				break;
			case 1: //Identity
				return x;
				break;
			case 2: //Step
				return x > 0 ? 1 : 0;
				break;
			case 3: //Tanh
				return Math.tanh(x);
				break;
			case 4: //ReLu
				return x < 0 ? 0 : x;
				break;
			default: //Sigmoid
				return 1 / (1 + Math.pow(Math.E, -4.9 * x));
				break;
		}
	}
}