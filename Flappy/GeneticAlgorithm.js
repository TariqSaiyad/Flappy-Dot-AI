

function nextGeneration() {

  calculateFitness();

  for (var i=0; i<TOTAL; i++) {
    birds[i] = pickABird();
  }
}


function pickABird() {

  var newBird = random(savedBirds);

  var child = new Bird(newBird.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  var sum=0;
  for (var bird of birds) {
    sum+=bird.score;
  }

  for (var b of birds) {
    b.fitness=b.score/sum;
  }
}
