

class EntityHandler{
    constructor(size){
		this.population = [];

		this.generation = 0;
		this.matingPool = [];

		for(let i = 0; i < size; i++){
			this.population.push(new Wasp(0));
			this.population[i].brain.generateNetwork();
			this.population[i].brain.mutate();
		}
	}
    updateAlive(show){
		for(let i = 0; i < this.population.length; i++){
			if(!this.population[i].dead){
				this.population[i].look();
				this.population[i].think();
				this.population[i].move();
				//this.population[i].update();
				
				if(show)
					this.population[i].show();
			}
		}
	}
    done(){
        for(let i = 0; i < this.population.lenght; i++){
            if(!this.population.dead){
                return false
            }
        }
        return true
    }

    calculateFitness(){
		let currentMax = 0;
		this.population.forEach((element) => { 
			element.calculateFitness();
			if(element.fitness > bestFitness){
				bestFitness = element.fitness;
				bestPlayer = element.clone();
				bestPlayer.brain.id = "BestGenome";
				bestPlayer.brain.draw(250, 250);
			}

			if(element.fitness > currentMax)
				currentMax = element.fitness;
		});

		//Normalize
		this.population.forEach((element, elementN) => { 
			element.fitness /= currentMax;
		});
	}
}