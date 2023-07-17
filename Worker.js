function Worker(x, y, num) {
  this.speed = round(random(1, 10));
  this.pos = createVector(x, y);

  this.show = function() {
    fill(66, 226, 244);
    ellipse(this.pos.x, this.pos.y, 48, 48);
    fill(147, 97, 31);
    rect(this.pos.x - 28, this.pos.y - 16, 56, 32, 20)
    fill(255);
    text(this.speed, this.pos.x, this.pos.y);
  }
}
