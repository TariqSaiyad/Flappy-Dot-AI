
//calculate fitness for the previous gen, and use it to find new birds for the next.
function nextGeneration() {

  calculateFitness();
  for (var i=0; i<TOTAL; i++) {
    birds[i] = pickABird();
  }
}


//select a bird based on fitness.
function pickABird() {
  var index=0;
  var r = random(1);

  while (r>0) {
    r=r-savedBirds[index].fitness;
    index++;
  }
  index--;

  var newBird = savedBirds[index];
  var child = new Bird(newBird.brain);
  child.mutate();
  return child;
}


//get the sum of fitness and find the proportion of fitness level each bird has.
function calculateFitness() {
  var sum=0;
  for (var bird of savedBirds) {
    sum+=bird.score;
  }

  for (var b of savedBirds) {
    b.fitness=b.score/sum;
  }
}
