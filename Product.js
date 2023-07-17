function Product(wid, hei, x, y) {
    // this.dim = createVector(wid, hei);
    this.pos = createVector(x, y);
    //
    this.update = function() {
      var vel = createVector(720, 0);
      vel.setMag(1);
      this.pos.add(vel);
    }

    this.show = function() {
        fill(103, 198, 43);
        stroke(0);
    	rect(this.pos.x, this.pos.y, wid, hei);
    }
}
