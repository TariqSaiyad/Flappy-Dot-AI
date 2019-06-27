// This is inspired by the Coding Train youtube channel.
// The neuro evolution library is also provided by the channel host.

const TOTAL = 500;
var birds = [];

var savedBirds=[];
var pipes = [];

var slider;
var counter =0;

var bestScore=  0;
var numGenerations=0;

let backgroundImg;

function setup() {
  createCanvas(400, 600);
  slider = createSlider(1, 100, 1); 
  //create multiple birds.
  for (var i=0; i<TOTAL; i++) {
    birds[i] = new Bird();
  }

  backgroundImg = loadImage('assets/background.png');
}


function draw() {



  //slider value used to speed up the simulation.
  for (n=0; n<slider.value(); n++) {
    //create new pipe.
    if (counter %80==0) {
      this.pipes.push(new Pipe());
    }
    counter++;

    //update all pipes.
    for (var i=pipes.length-1; i>=0; i--) {
      //pipes[i].show();
      pipes[i].update();
      //for all birds, check if it hits the pipe.
      for (var j=birds.length-1; j>=0; j--) {
        // check if bird hits pipe.
        if (pipes [i].hits(birds[j])) {
          this.savedBirds.push( birds.splice(j, 1)[0]);
        }
      }

      //remove pipes that are not onscreen.
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    } 

    //if bird goes offscreen, remove it.
    for (var k=birds.length-1; k>=0; k--) {
      if (birds [k].offScreen()) {
        this.savedBirds.push( birds.splice(k, 1)[0]);
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
      this.numGenerations++;
      pipes.splice(0, 1);
    }
  }

  // DRAWING HERE
  background(0);
  
  image(backgroundImg, 0, 0, width, height);
 
  for (var birdie of birds) {
    birdie.show();

    if (birdie.score>this.bestScore) {
      this.bestScore=birdie.score;
    }
  }

  for (var pipe of pipes) {
    pipe.show();
  }


  textSize(17);
  fill(255);
  text('Generation: '+this.numGenerations, 5, 565);
  text('Max: '+this.bestScore, 5, 590);
}


//function keyPressed() {
//  if (key==' ') {
//    bird.up();
//  }
//}
