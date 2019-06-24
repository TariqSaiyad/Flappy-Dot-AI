const TOTAL = 500;
var birds = [];

var savedBirds=[];
var pipes = [];

var slider;
var counter =0;
function setup() {
  createCanvas(400, 600);
  slider = createSlider(1,100,1);
  //create multiple birds.
  for (var i=0; i<TOTAL; i++) {
    birds[i] = new Bird();
  }
}


function draw() {

  for (n=0; n<slider.value(); n++) {

    //create new pipe.
    if (counter %80==0) {
      this.pipes.push(new Pipe());
    }
    counter++;

    for (var i=pipes.length-1; i>=0; i--) {
      //pipes[i].show();
      pipes[i].update();

      for (var j=birds.length-1; j>=0; j--) {
        // check if bird hits pipe.
        if (pipes[i].hits(birds[j]) || birds[j].y==height) {
          this.savedBirds.push( birds.splice(j, 1)[0]);
        }
      }

      //remove pipes that are not onscreen.
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    } 


    //for all birds, make them think, update and draw.
    for (var bird of birds) {
      bird.think(pipes);
      bird.update();
      // bird.show();
    }


    //make new generation of birds if all of them hit the pipes.
    if (birds.length==0) {
      nextGeneration();
    }
  }



  // DRAWING HERE
  background(0);
  for (bird of birds) {
    bird.show();
  }
  for (var pipe of pipes) {
    pipe.show();
  }
}


function keyPressed() {
  if (key==' ') {
    bird.up();
  }
}
