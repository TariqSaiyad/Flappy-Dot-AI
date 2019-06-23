function Bird(brain) {
  this.y = width/2;
  this.x = 25;

  this.gravity = 0.9;
  this.velocity = 0;
  this.lift = -25;
  if (brain) {
    this.brain =brain.copy();
  } else {
    this.brain = new NeuralNetwork(4, 4, 2);
  }
  this.score=0;
  this.fitness=0;


  this.show=function() { 
    stroke(255);
    fill(255, 50);

    ellipse(this.x, this.y, 16, 16);
  };


  this.update = function() {
    this.score++;


    this.velocity +=this.gravity;
    this.velocity*=0.9;
    this.y+=this.velocity;

    if (this.y>=height) {
      this.y=height;
      this.velocity=0;
    }

    if (this.y<0) {
      this.y=0;
      this.velocity=0;
    }
  };


  this.up=function() {
    this.velocity+=this.lift;
  };


  this.think = function(pipes) {

    var closest = null;
    var closestDistance=Infinity;
    for (var i=0; i<pipes.length; i++) {
      var d= pipes[i].x-this.x;
      if (d<closestDistance && d>0) {
        closest=pipes[i];
        closestDistance=d;
      }
    }

    var inputs=[];

    inputs[0]=this.y/height;
    inputs[1]=closest.top/height;
    inputs[2]=closest.bottom/height;
    inputs[3]=closest.x/width;

    var output = this.brain.predict(inputs);

    if (output[0]>output[1]) {
      this.up();
    }
  };


  this.mutate=function() {
    this.brain.mutate(0.1);
  };
}
