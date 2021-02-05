class RandomDie {
    constructor(numSides){
        this.numSides = numSides
    }
    
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll(args) {
        var output = []
        for (var i = 0; i < args.numRolls; i++) {
            output.push(this.rollOnce());
          }
          return output;
    }
}

//Top level API endpoint
module.exports = {
    rollDice: (args) => {
        return new RandomDie(args.numSides ?? 6);
    }
}