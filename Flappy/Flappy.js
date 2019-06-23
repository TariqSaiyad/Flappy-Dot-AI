var bird;
var pipes = [];

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}


function draw() {
  background(0);

  for (var i=pipes.length-1; i>0; i--) {
    pipes[i].show();
    pipes[i].update();
    
    //check if bird hits.
    if(pipes[i].hits(bird)){
     console.log("HERE");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  } 


  if (frameCount %80==0) {
    this.pipes.push(new Pipe());
  }

  bird.update();
  bird.show();


}

function keyPressed() {
  if (key==' ') {
    bird.up();
  }
}
