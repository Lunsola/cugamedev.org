var s = function( p ) {

  p.setup = function() {
    p.createCanvas(400, 400);
    p.pixelDensity(1);
  };

  p.draw = function() {
    var maxiterations = 100;

    p.loadPixels();
    for (var x = 0; x < p.width; x++) {
      for (var y = 0; y < p.height; y++) {

        var a = p.map(x, 0, p.width, -2.2, 0.8);
        var b = p.map(y, 0, p.height, -1.5, 1.5);

        var ca = a;
        var cb = b;

        var n = 0;

        while (n < maxiterations) {
          var aa = a * a - b * b;
          var bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }

        var bright = p.map(n, 0, maxiterations, 0, 1);
        bright = p.map(p.sqrt(bright), 0, 1, 0, 255);

        if (n == maxiterations) {
          bright = 0;
        }

        var pix = (x + y * p.width) * 4;
        p.pixels[pix + 0] = bright;
        p.pixels[pix + 1] = bright;
        p.pixels[pix + 2] = bright;
        p.pixels[pix + 3] = 255;
      }
    }
    p.updatePixels();
  };
};

var t = function(p) {

  var angle = 0;
  var slider, c;

  p.setup = function() {
    c = p.createCanvas(400, 400);
    c.position();
    slider = p.createSlider(0, p.PI, p.PI / 4, 0.01);
    slider.position(c.position().x,c.position().y);
    slider.position(c.position().x,c.position().y);
  };

  p.draw = function() {
    p.background(0);
    angle = slider.value();
    p.stroke(255);
    p.translate(200, p.height);
    p.branch(100);

  };

  p.branch = function(len) {
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    if (len > 3) {
      p.push();
      p.rotate(angle);
      p.branch(len * 0.67);
      p.pop();

      p.push();
      p.rotate(-angle);
      p.branch(len * 0.67);
      p.pop();
    }
  };
};

new p5(s, 'c1');
new p5(t, 'c2');