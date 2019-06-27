//This defines a pipe that the bird must avoid.
function Pipe() {
  this.spacing = 125;
  this.top = random(height/6, 3/4* height);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 40;
  this.highlight=false;
  this.speed= 2;
  
  this.imgDown = loadImage('assets/pipeDown.png');
  this.imgUp=loadImage('assets/pipeUp.png');

  //This draws the pipe.
  this.show =function() {
    //if (this.highlight) {
    //  fill(255, 0, 255);
    //} else {
    //  fill(255);
    //}
    //rect(this.x, 0, this.w, this.top);
   // rect(this.x, height-this.bottom, this.w, this.bottom);
    
    image(this.imgDown, this.x, 0, this.w, this.top);
    image(this.imgUp,this.x, height-this.bottom, this.w, this.bottom);
  };


  //This updates the pipe position.
  this.update=function() {
    this.x-=this.speed;
  };


  //detects if the pipe is out of screen.
  this.offscreen =function() {
    if (this.x<-this.w) {
      return true;
    } else {
      return false;
    }
  };


  //check if the pipe has hit the bird passed into it.
  this.hits =function(bird) {
    if (bird.y<this.top || bird.y> height-this.bottom) {
      if (bird.x>this.x && bird.x<this.x+this.w) {
        this.highlight=true;
        return true;
      }
    }
    this.highlight=false;
    return false;
  };
}
