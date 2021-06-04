class Hasher {
  constructor(_x, _y, _size) 
  {
    this.x = _x;
		this.y = _y;
		this.size = _size;
		this.bigBlocks = floor(random(1, 3));
		this.smallBlocks = floor(random(3, 15));
		this.diagBlocks = 0;
		this.eyes = 0;
		this.dots = [];
		this.hue = 0;
		//this.update();
	}
  
  draw() 
  {
		var sz = this.size;
		var x = this.x;
		var y = this.y;
		var pX = sz / 8;
		//stroke(20);
		//fill(15);
		//rect(x, y, sz, sz, pX / 2);
		noStroke();
		for (let p of this.dots)
		{
			fill(p.c);
			var xx = (p.x * pX) + x;
			var yy = (p.y * pX) + y;
			var ww = p.w * pX;
			var hh = p.h * pX;
			rect(xx, yy, ww , hh);
			
			if (p.d == true)
			{
				rect((x + sz) - ((p.x * pX) + pX), yy, ww , hh);
			}
			
		}
	}
	
	update(big, small)
	{
		this.dots = [];		
		
		this.bigBlocks = big;
		this.smallBlocks = small;
		this.diagBlocks = floor(random(0, 5));
		var adj = 0.01;
		
		var c1 = color(random(360), random(25, 75), random(50, 100));
		this.hue = c1._getHue();
		var c2 = (color((c1._getHue() + random(0, 40)) % 360, random(50, 100), random(100, 100)));
		var c3 = color(random(330, 400) % 360, random(80, 100), 100);
		var c4 = random(100) < 50 ? c1 : c2;


		for (let i = 0; i < this.bigBlocks; i++)
		{
			var x = 4 - (floor(random(4)) + 1);
			var y = floor(random(4)) + 1;
			this.dots.push({
								x: x,
								y: y,
								w: (4 - x) * 2 + adj,
								h: floor(random(2)) + 2 + adj,
								c: 	c1,
								d: false
			});
		}
		
		for (let i = 1; i < this.smallBlocks; i++)
		{
			this.dots.push({
								x: floor(random(1, 3)),
								y: floor(random(1, 7)),
								w: 1 + adj,
								h: floor(random(1, 3)) + adj,
								c: c2,
								d: true
		});
		}
		
		for (let i = 1; i < this.diagBlocks; i++)
		{
			let x1 = floor(random(0, 4));
			let y1 = floor(random(1, 7));
			this.dots.push({
								x: x1,
								y: y1,
								w: 1 + adj,
								h: floor(random(1, 2)) + adj,
								c: c4,
								d: true
			});
			this.dots.push({
								x: x1 - 1,
								y: y1 > 4 ? y1 + 1 : y1 -1,
								w: 1 + adj,
								h: floor(random(1, 2)) + adj,
								c: c4,
								d: true
			});
		}
		
		this.eyes = random(10) < 2 ? 2 : 1;
		
		this.dots.push({
								x: floor(random(1, 4)),
								y: floor(random(2, 4)),
								w: floor(random(1, 2)),
								h: this.eyes,
								c: c3,
								d: true
		});

	}
}

let DIV = 6;
let invader;
let square; 
let counter = 0;
let bigBlocks;
let smallBlocks;

function setup() {
	colorMode(HSB,360,100,100,100);
	windowResized();
	
	background(40);
    
  
}

function windowResized() {
	if (windowWidth > windowHeight) square = windowHeight;
	else square = windowWidth;
  resizeCanvas(square, square);
	
	var tmp = square;
	var d_sz = (tmp / 2) * 0.8;
  var d_xorg = (tmp / 2) - (d_sz / 2);
  var d_yorg = (tmp / 2) - (d_sz / 2);
	
	
 	invader = new Hasher(d_xorg, 
														 d_yorg, 
														 d_sz);
	
	bigBlocks = floor(random(1, 3));
	smallBlocks = floor(random(3, 15));
	invader.update(bigBlocks, smallBlocks);

}

function draw() 
{
	blendMode(BLEND);
  //blendMode(ADD);
	var tmp = square;
  var d_xorg = (tmp / 2) - (tmp / 2) + ((tmp / DIV) / 4.5);
  var d_yorg =((tmp / DIV) / 4);
  var d_sz = (tmp / DIV) * 0.8;
  var d_offset = (tmp / DIV) * 0.95;
	
	bigBlocks = floor(random(1, 3));
	smallBlocks = floor(random(3, 15));
	
	
	background((invader.hue), 30, 20);
	invader.draw();
}

function keyPressed() {
  if (keyCode === 70) {
		invader.update(bigBlocks, smallBlocks);
	} else if (keyCode === 83) {
		saveCanvas("invader_" + counter++ + "_complexity_" + ((invader.bigBlocks * invader.smallBlocks) * invader.eyes), "png");
	}
}




