const TOTAL = 250;
var birds = [];

var savedBirds=[];
var pipes = [];

function setup() {
  createCanvas(400, 600);


  for (var i=0; i<TOTAL; i++) {
    birds[i] = new Bird();
  }

  pipes.push(new Pipe());
}


function draw() {
  background(0);

  for (var i=pipes.length-1; i>=0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (var j=birds.length-1; j>=0; j--) {
      // check if bird hits.
      if (pipes[i].hits(birds[j])) {
        this.savedBirds.push( birds.splice(j, 1)[0]);
        console.log("HERE");
      }
    }



    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  } 



  for (var bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show();
  }

  if (birds.length==0) {
    nextGeneration();
  }

  if (frameCount %80==0) {
    this.pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key==' ') {
    bird.up();
  }
}
