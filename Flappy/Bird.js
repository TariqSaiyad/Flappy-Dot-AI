
//This defines a bird object, that can "fly". It will react to gravity and its y position will change accordingly.
function Bird(brain) {
  //fields that define the bird.
  this.y = width/2;
  this.x = 25;
  this.gravity = 0.9;
  this.velocity = 0;
  this.lift = -25;

  //this is to copy the bird's brain to another bird object, when creating a new generation.
  if (brain) {
    this.brain =brain.copy();
  } else {
    this.brain = new NeuralNetwork(5, 8, 2);
  }
  //below is used for the fitness function.
  this.score=0;
  this.fitness=0;


  //This draws the bird.
  this.show=function() { 
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, 16, 16);
  };

  //This updates the bird position and score.
  this.update = function() {
    this.score++;
    this.velocity +=this.gravity;
    this.velocity*=0.9;
    this.y+=this.velocity;
  };


  //this moves the bird up.
  this.up=function() {
    this.velocity+=this.lift;
  };


  //This is  used to make the bird "think" using the neuro-evolutiuon.
  this.think = function(pipes) {

    //get the closest pipe.
    var closest = null;
    var closestDistance=Infinity;
    for (var i=0; i<pipes.length; i++) {
      var d= (pipes[i].x+pipes[i].w)-this.x;
      if (d<closestDistance && d>0) {
        closest=pipes[i];
        closestDistance=d;
      }
    }

    //send the input fields to the brain to predict next move.
    var inputs=[];
    inputs[0]=this.y/height;
    inputs[1]=closest.top/height;
    inputs[2]=closest.bottom/height;
    inputs[3]=closest.x/width;
    inputs[4]=this.velocity/10;

    var output = this.brain.predict(inputs);

    if (output[0]>output[1]) {
      this.up();
    }
  };


  //mutate the bird.
  this.mutate=function() {
    this.brain.mutate(0.1);
  };

  //detect if the bird goes out of bounds.
  this.offScreen=function() {
    return this.y>height || this.y<0;
  };
}
