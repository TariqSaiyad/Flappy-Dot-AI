function Pipe() {


  this.top = random(50, height/2-20);
  this.bottom = random(50, height/2);
  this.x = width;
  this.w = 40;

  this.highlight=false;
  this.speed= 2;


  this.show =function() {
    if (this.highlight) {
      fill(255, 0, 255);
    } else {
      fill(255);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  };


  this.update=function() {
    this.x-=this.speed;
  };

  this.offscreen =function() {
    if (this.x<-this.w) {
      return true;
    } else {
      return false;
    }
  };

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
